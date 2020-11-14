import React from "react";
import PullRequest from "./PullRequest";
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay";
import type { PullRequestList_repository } from "./__generated__/PullRequestList_repository.graphql";

function PullRequestList({
  relay,
  repository,
}: {
  relay: RelayPaginationProp;
  repository: PullRequestList_repository;
}): JSX.Element {
  return (
    <section className="section">
      <div className="container">
        {repository.pullRequests != null &&
        repository.pullRequests.edges != null
          ? repository.pullRequests.edges.map((edge) => {
              if (edge != null && edge.node != null) {
                return (
                  <PullRequest key={edge.node.id} pullRequest={edge.node} />
                );
              } else {
                return null;
              }
            })
          : null}
        {relay.hasMore() ? (
          <div className="has-text-centered">
            <button
              className="button"
              onClick={() => {
                if (!relay.hasMore() || relay.isLoading()) {
                  return;
                }

                relay.loadMore(10, (error) => {
                  console.log(error);
                });
              }}
            >
              Load more
            </button>
          </div>
        ) : null}
      </div>
    </section>
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
        owner: props.repository.owner,
        name: props.repository.name,
      };
    },
    query: graphql`
      query PullRequestListPaginationQuery(
        $owner: String!
        $name: String!
        $count: Int!
        $cursor: String
      ) {
        viewer {
          repository(owner: $owner, name: $name) {
            ...PullRequestList_repository
              @arguments(count: $count, cursor: $cursor)
          }
        }
      }
    `,
  }
);
