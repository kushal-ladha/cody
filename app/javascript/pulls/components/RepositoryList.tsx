import React from "react";
import Repository from "./Repository";
import { createFragmentContainer, createPaginationContainer, graphql, RelayPaginationProp } from "react-relay";
import type { RepositoryList_viewer } from "./__generated__/RepositoryList_viewer.graphql";

const RepositoryList = ({
  relay,
  viewer,
}: {
  relay: RelayPaginationProp;
  viewer: RepositoryList_viewer;
}) => (
  <section className="section">
    <div className="container">
      {viewer.repositories != null && viewer.repositories.edges != null
        ? viewer.repositories.edges.map((edge) => {
            if (edge != null && edge.node != null) {
              // https://github.com/facebook/relay/issues/1918
              return <Repository key={edge.node.id} repository={edge.node} />;
            }
          })
        : null}
      {relay.hasMore() ? <div className="has-text-centered">
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
      </div> : null}
    </div>
  </section>
);

export default createPaginationContainer(
  RepositoryList,
  {
    viewer: graphql`
      fragment RepositoryList_viewer on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        repositories(first: $count, after: $cursor)
          @connection(key: "RepositoryList_repositories") {
          edges {
            node {
              id
              ...Repository_repository
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.repositories;
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
      };
    },
    query: graphql`
      query RepositoryListPaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...RepositoryList_viewer @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
);
