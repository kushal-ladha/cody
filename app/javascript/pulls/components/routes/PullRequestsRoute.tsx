import React from "react";
import PullRequestList from "../PullRequestList";
import PageHead from "./PageHead";
import { QueryRenderer, graphql, Environment } from "react-relay";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { PullRequestsRouteQuery } from "./__generated__/PullRequestsRouteQuery.graphql";

type Params = {
  owner: string;
  name: string;
};

function PullRequestsRoute({
  environment,
  match,
}: {
  environment: Environment;
} & RouteComponentProps<Params>): JSX.Element {
  return (
    <>
      <PageHead title={`${match.params.owner}/${match.params.name}`} />
      <QueryRenderer<PullRequestsRouteQuery>
        environment={environment}
        query={graphql`
          query PullRequestsRouteQuery($owner: String!, $name: String!) {
            viewer {
              repository(owner: $owner, name: $name) {
                ...PullRequestList_repository
              }
              login
              name
            }
          }
        `}
        variables={{
          owner: match.params.owner,
          name: match.params.name,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props && props.viewer) {
            return <PullRequestList repository={props.viewer.repository} />;
          }
          return <div className="loader">Loading</div>;
        }}
      />
    </>
  );
}

export default withRouter(PullRequestsRoute);
