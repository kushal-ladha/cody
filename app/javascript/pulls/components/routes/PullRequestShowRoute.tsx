import React from "react";
import PullRequestDetail from "../PullRequestDetail";
import PageHead from "./PageHead";
import { QueryRenderer, graphql } from "react-relay";
import { withRouter } from "react-router-dom";
import { PullRequestShowRouteQuery } from "__generated__/PullRequestShowRouteQuery.graphql";

const PullRequestShowRoute = ({
  environment,
  match
}: {
  environment: any,
  match: any
}) => (
  <>
    <PageHead
      title={`Pull Request #${match.params.number} - ${match.params.owner}/${
        match.params.name
      }`}
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
        number: match.params.number
      }}
      render={({
        error,
        props: queryResponse
      }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (
          queryResponse &&
          queryResponse.viewer &&
          queryResponse.viewer.repository
        ) {
          return (
            <PullRequestDetail
              pullRequest={queryResponse.viewer.repository.pullRequest}
            />
          );
        }
        return <div className="loader">Loading</div>;
      }}
    />
  </>
);

export default withRouter(PullRequestShowRoute);
