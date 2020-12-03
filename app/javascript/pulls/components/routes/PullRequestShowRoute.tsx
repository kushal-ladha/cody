import React from "react";
import PullRequestDetail from "../PullRequestDetail";
import PageHead from "./PageHead";
import environment from "../../environment";
import { QueryRenderer, graphql } from "react-relay";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { PullRequestShowRouteQuery } from "./__generated__/PullRequestShowRouteQuery.graphql";

type Params = {
  number: string;
  owner: string;
  name: string;
};

function PullRequestShowRoute({
  match,
}: RouteComponentProps<Params>): JSX.Element {
  return (
    <>
      <PageHead
        title={`Pull Request #${match.params.number} - ${match.params.owner}/${match.params.name}`}
      />
      <QueryRenderer<PullRequestShowRouteQuery>
        environment={environment}
        query={graphql`
          query PullRequestShowRouteQuery(
            $owner: String!
            $name: String!
            $number: String!
          ) {
            viewer {
              repository(owner: $owner, name: $name) {
                pullRequest(number: $number) {
                  ...PullRequestDetail_pullRequest
                }
              }
            }
          }
        `}
        variables={{
          owner: match.params.owner,
          name: match.params.name,
          number: match.params.number,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props && props.viewer && props.viewer.repository) {
            return (
              <PullRequestDetail
                pullRequest={props.viewer.repository.pullRequest}
              />
            );
          }
          return null;
        }}
      />
    </>
  );
}

export default withRouter(PullRequestShowRoute);
