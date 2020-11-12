import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import AssignedReviews from "../AssignedReviews";
import PageHead from "./PageHead";
import { PullsRouteQuery } from "./__generated__/PullsRouteQuery.graphql";

function PullsRoute({ environment }: { environment: RelayModernEnvironment }) {
  return (
    <>
      <PageHead title="Assigned Code Reviews" />
      <QueryRenderer<PullsRouteQuery>
        environment={environment}
        query={graphql`
          query PullsRouteQuery {
            viewer {
              ...AssignedReviews_viewer
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return <AssignedReviews viewer={props.viewer} />;
          } else {
            return <div className="loader">Loading</div>;
          }
        }}
      />
    </>
  );
}

export default PullsRoute;
