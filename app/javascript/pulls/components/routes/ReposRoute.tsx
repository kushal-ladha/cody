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
      <header>
        <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl leading-tight font-semibold text-gray-900">
            Repositories
          </h1>
        </div>
      </header>
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
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return <RepositoryList viewer={props.viewer} />;
          }
          return null;
        }}
      />
    </>
  );
}

export default ReposRoute;
