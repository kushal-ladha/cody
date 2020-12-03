import React from "react";
import RepositoryList from "../RepositoryList";
import PageHead from "./PageHead";
import environment from "../../environment";
import { QueryRenderer, graphql } from "react-relay";
import { ReposRouteQuery } from "./__generated__/ReposRouteQuery.graphql";

function ReposRoute(): JSX.Element {
  return (
    <>
      <PageHead title="Repositories" />
      <QueryRenderer<ReposRouteQuery>
        environment={environment}
        query={graphql`
          query ReposRouteQuery {
            viewer {
              ...RepositoryList_viewer
            }
          }
        `}
        variables={{}}
        render={({ error, props: queryResponse }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (queryResponse) {
            return <RepositoryList viewer={queryResponse.viewer} />;
          }
          return null;
        }}
      />
    </>
  );
}

export default ReposRoute;
