import React from "react";
import ReviewRuleList from "../ReviewRuleList";
import PageHead from "./PageHead";
import { QueryRenderer, graphql } from "react-relay";
import { withRouter } from "react-router-dom";
import { RulesRouteQuery } from "__generated__/RulesRouteQuery.graphql";

const RulesRoute = ({
  environment,
  match
}: {
  environment: any,
  match: any
}) => (
  <>
    <PageHead
      title={`Review Rules - ${match.params.owner}/${match.params.name}`}
    />
    <QueryRenderer<RulesRouteQuery>
      environment={environment}
      query={graphql`
        query RulesRouteQuery(
          $owner: String!
          $name: String!
          $cursor: String
        ) {
          viewer {
            repository(owner: $owner, name: $name) {
              ...ReviewRuleList_repository
            }
          }
        }
      `}
      variables={{
        ...match.params
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
            <ReviewRuleList repository={queryResponse.viewer.repository} />
          );
        }
        return <div className="loader">Loading</div>;
      }}
    />
  </>
);

export default withRouter(RulesRoute);
