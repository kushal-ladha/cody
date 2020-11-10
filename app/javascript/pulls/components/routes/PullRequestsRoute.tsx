import React from "react";
import PullRequestList from "../PullRequestList";
import PageHead from "./PageHead";
import { QueryRenderer, graphql } from "react-relay";
import { withRouter } from "react-router-dom";
import { PullRequestsRouteQuery } from "__generated__/PullRequestsRouteQuery.graphql";

const PullRequestsRoute = ({
  environment,
  match
}: {
  environment: any,
  match: any
}) => (
  <>
    <PageHead title={`${match.params.owner}/${match.params.name}`} />
    <QueryRenderer<PullRequestsRouteQuery>
      environment={environment}
      query={graphql`
        query PullRequestsRouteQuery(
          $owner: String!
          $name: String!
          $cursor: String
        ) {
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
        name: match.params.name
      }}
      render={({
        error,
        props: queryResponse
      }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (queryResponse && queryResponse.viewer) {
          return (
            <PullRequestList repository={queryResponse.viewer.repository} />
          );
        }
        return <div className="loader">Loading</div>;
      }}
    />
  </>
);

export default withRouter(PullRequestsRoute);
