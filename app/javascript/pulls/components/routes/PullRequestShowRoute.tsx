import React from "react";
import PullRequestDetail from "../PullRequestDetail";
import PageHead from "./PageHead";
import environment from "../../environment";
import { QueryRenderer, graphql } from "react-relay";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { PullRequestShowRouteQuery } from "./__generated__/PullRequestShowRouteQuery.graphql";
import Container from "../Container";

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
          } else if (props) {
            if (
              props.viewer &&
              props.viewer.repository &&
              props.viewer.repository.pullRequest
            ) {
              return (
                <PullRequestDetail
                  pullRequest={props.viewer.repository.pullRequest}
                />
              );
            } else {
              return (
                <Container>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="divide-y divide-gray-200">
                      <ul>
                        <li>
                          <div className="mx-auto text-sm font-medium px-4 py-4 sm:px-6">
                            <p>Nothing to show</p>
                            <p className="italic mt-2 text-gray-500">
                              If you think this is an error, please check that
                              the repository exists and is accessible to you on
                              GitHub.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Container>
              );
            }
          }
          return null;
        }}
      />
    </>
  );
}

export default withRouter(PullRequestShowRoute);
