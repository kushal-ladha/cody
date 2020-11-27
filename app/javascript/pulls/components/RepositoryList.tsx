import React from "react";
import Repository from "./Repository";
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay";
import type { RepositoryList_viewer } from "./__generated__/RepositoryList_viewer.graphql";
import LoadMore from "./LoadMore";
import List from "./List";
import Container from "./Container";

function RepositoryList({
  relay,
  viewer,
}: {
  relay: RelayPaginationProp;
  viewer: RepositoryList_viewer;
}): JSX.Element {
  return (
    <Container>
      <>
        <List>
          {() => {
            if (
              viewer.repositories != null &&
              viewer.repositories.edges != null
            ) {
              return (
                <>
                  {viewer.repositories.edges.map((edge) => {
                    if (edge != null && edge.node != null) {
                      // https://github.com/facebook/relay/issues/1918
                      return (
                        <Repository key={edge.node.id} repository={edge.node} />
                      );
                    }
                  })}
                </>
              );
            } else {
              return null;
            }
          }}
        </List>

        <LoadMore relay={relay} />
      </>
    </Container>
  );
}

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
