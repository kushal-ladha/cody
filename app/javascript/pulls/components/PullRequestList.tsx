import React from "react";
import PullRequest from "./PullRequest";
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay";
import type { PullRequestList_repository } from "./__generated__/PullRequestList_repository.graphql";
import List from "./List";
import LoadMore from "./LoadMore";
import Container from "./Container";

function PullRequestList({
  relay,
  repository,
}: {
  relay: RelayPaginationProp;
  repository: PullRequestList_repository;
}): JSX.Element {
  return (
    <Container>
      <>
        <List>
          {() => {
            if (
              repository != null &&
              repository.pullRequests != null &&
              repository.pullRequests.edges != null &&
              repository.pullRequests.edges.length > 0
            ) {
              return (
                <>
                  {repository.pullRequests.edges.map((edge) => {
                    if (edge != null && edge.node != null) {
                      return (
                        <PullRequest
                          key={edge.node.id}
                          pullRequest={edge.node}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                </>
              );
            } else {
              return (
                <li>
                  <div className="mx-auto text-sm font-medium px-4 py-4 sm:px-6">
                    <p>Nothing to show</p>
                    <p className="italic mt-2 text-gray-500">
                      If you think this is an error, please check that the
                      repository exists and is accessible to you on GitHub.
                    </p>
                  </div>
                </li>
              );
            }
          }}
        </List>

        <LoadMore relay={relay} />
      </>
    </Container>
  );
}

export default createPaginationContainer(
  PullRequestList,
  {
    repository: graphql`
      fragment PullRequestList_repository on Repository
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        id
        owner
        name
        pullRequests(first: $count, after: $cursor)
          @connection(key: "PullRequestList_pullRequests") {
          edges {
            node {
              id
              ...PullRequest_pullRequest
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.repository && props.repository.pullRequests;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }) {
      return {
        count,
        cursor,
        repoID: props.repository.id,
      };
    },
    query: graphql`
      query PullRequestListPaginationQuery(
        $repoID: ID!
        $count: Int!
        $cursor: String
      ) {
        repository: node(id: $repoID) {
          ...PullRequestList_repository
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
);
