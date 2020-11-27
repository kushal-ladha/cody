import React from "react";
import ReviewRuleList from "../ReviewRuleList";
import PageHead from "./PageHead";
import { QueryRenderer, graphql, Environment } from "react-relay";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RulesRouteQuery } from "./__generated__/RulesRouteQuery.graphql";

type Params = {
  owner: string;
  name: string;
};

function RulesRoute({
  environment,
  match,
}: {
  environment: Environment;
} & RouteComponentProps<Params>): JSX.Element {
  return (
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
          ...match.params,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props && props.viewer && props.viewer.repository) {
            return <ReviewRuleList repository={props.viewer.repository} />;
          }
          return null;
        }}
      />
    </>
  );
}

export default withRouter(RulesRoute);
