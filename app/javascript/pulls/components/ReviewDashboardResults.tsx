import React from "react";
import {
  Calendar,
  ChevronRight,
  GitPullRequest,
  HelpCircle,
} from "react-feather";
import {
  createPaginationContainer,
  Environment,
  graphql,
  QueryRenderer,
  RelayPaginationProp,
} from "react-relay";
import Container from "./Container";
import List from "./List";
import { ReviewDashboardResults_viewer } from "./__generated__/ReviewDashboardResults_viewer.graphql";
import { ReviewDashboardResultsPullRequestExternalQuery } from "./__generated__/ReviewDashboardResultsPullRequestExternalQuery.graphql";
import { FormattedDate } from "react-intl";
import { Link } from "react-router-dom";
import LoadMore from "./LoadMore";

function ReviewDashboardResults({
  viewer,
  relay,
  environment
}: {
  viewer: ReviewDashboardResults_viewer;
  relay: RelayPaginationProp;
  environment: Environment
}): JSX.Element {
  return (
    <>
      <Container>
        <>
          <List>
            {() => {
              if (
                viewer.assignedReviews != null &&
                viewer.assignedReviews.edges != null &&
                viewer.assignedReviews.edges.length > 0
              ) {
                return (
                  <>
                    {viewer.assignedReviews.edges.map((edge) => {
                      if (edge != null && edge.node != null) {
                        const { node } = edge;
                        return (
                          <li key={node.id}>
                            <div className="flex items-center px-4 py-4 sm:px-6">
                              <div className="min-w-0 flex-1 flex items-center">
                                <div className="flex-shrink-0">
                                  <GitPullRequest />
                                </div>
                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                  <div>
                                    <p className="text-sm font-medium truncate">
                                      <QueryRenderer<ReviewDashboardResultsPullRequestExternalQuery>
                                        environment={environment}
                                        query={graphql`
                                          query ReviewDashboardResultsPullRequestExternalQuery($nodeID: ID!) {
                                            node(id: $nodeID) {
                                              ...on PullRequest {
                                                title
                                                htmlUrl
                                              }
                                            }
                                          }
                                        `}
                                        variables={{ nodeID: node.pullRequest.id }}
                                        render={({ props, error }) => {
                                          if (error) {
                                            console.log(error.message);
                                            return (
                                              <span>{`${node.pullRequest.repository} #${node.pullRequest.number}`}</span>
                                            );
                                          } else if (props) {
                                            return (
                                              <a
                                                title={props.node.title}
                                                href={props.node.htmlUrl}
                                                rel="external"
                                                target="_blank"
                                              >
                                                {props.node.title}
                                              </a>
                                            );
                                          }
                                          return (
                                            <span>{`${node.pullRequest.repository} #${node.pullRequest.number}`}</span>
                                          );
                                        }}
                                      />
                                    </p>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                      <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                          <span
                                            className="text-sm"
                                            title="Why was I assigned?"
                                          >
                                            <HelpCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                          </span>
                                          {node.reviewRule != null
                                            ? node.reviewRule.name
                                            : "Manually assigned"}
                                        </p>
                                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                          <span
                                            className="text-sm"
                                            title="Created at"
                                          >
                                            <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                          </span>
                                          <FormattedDate
                                            value={
                                              new Date(
                                                node.pullRequest.createdAt
                                              )
                                            }
                                            year="numeric"
                                            month="short"
                                            day="2-digit"
                                          />
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="hidden md:block">
                                    <div className="-space-x-1">
                                      {node.pullRequest.reviewers.nodes.map(
                                        (reviewer) => {
                                          return (
                                            <span
                                              key={reviewer.id}
                                              title={reviewer.login}
                                              className="relative inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500 ring-2 ring-white"
                                            >
                                              <span className="text-xs font-medium leading-none text-white cursor-default">
                                                {reviewer.login
                                                  .charAt(0)
                                                  .toUpperCase()}
                                              </span>
                                              {reviewer.status ==
                                              "PENDING_APPROVAL" ? (
                                                <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full ring-2 ring-white bg-yellow-400"></span>
                                              ) : null}
                                            </span>
                                          );
                                        }
                                      )}
                                    </div>
                                    <div className="mt-2">
                                      <p className="text-sm text-gray-500">
                                        {`${node.pullRequest.repository} #${node.pullRequest.number}`}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <Link
                                    to={`/repos/${node.pullRequest.repository}/pull/${node.pullRequest.number}`}
                                    title="Open on Cody"
                                  >
                                    <ChevronRight />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      }
                    })}
                  </>
                );
              } else {
                return (
                  <li>
                    <div className="mx-auto text-sm font-medium px-4 py-4 sm:px-6">
                      Nothing to show
                    </div>
                  </li>
                );
              }
            }}
          </List>
          <LoadMore relay={relay} />
        </>
      </Container>
    </>
  );
}

export default createPaginationContainer(
  ReviewDashboardResults,
  {
    viewer: graphql`
      fragment ReviewDashboardResults_viewer on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
        status: { type: ReviewerStatus, defaultValue: PENDING_APPROVAL }
        reviewRuleName: { type: "String" }
        repositoryName: { type: "String" }
      ) {
        assignedReviews(
          first: $count
          after: $cursor
          status: $status
          reviewRule: $reviewRuleName
          repository: $repositoryName
        ) @connection(key: "ReviewDashboardResults_assignedReviews") {
          edges {
            node {
              id
              reviewRule {
                name
              }
              pullRequest {
                id
                createdAt
                repository
                number
                reviewers {
                  nodes {
                    id
                    login
                    status
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.assignedReviews;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        reviewRuleName: fragmentVariables.reviewRuleName,
        repositoryName: fragmentVariables.repositoryName,
      };
    },
    query: graphql`
      query ReviewDashboardResultsPaginationQuery(
        $count: Int!
        $cursor: String
        $reviewRuleName: String
        $repositoryName: String
      ) {
        viewer {
          ...ReviewDashboardResults_viewer
            @arguments(
              count: $count
              cursor: $cursor
              reviewRuleName: $reviewRuleName
              repositoryName: $repositoryName
            )
        }
      }
    `,
  }
);