import React from "react";
import { render } from "test-utils";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { QueryRenderer, graphql, Environment } from "react-relay";
import Repository from "../Repository";
import { RepositoryTestSnapshotQuery } from "./__generated__/RepositoryTestSnapshotQuery.graphql";

const TestComponent = ({ environment }: { environment: Environment }) => (
  <QueryRenderer<RepositoryTestSnapshotQuery>
    environment={environment}
    query={graphql`
      query RepositoryTestSnapshotQuery @relay_test_operation {
        viewer {
          repositories(first: 10) {
            edges {
              node {
                ...Repository_repository
              }
            }
          }
        }
      }
    `}
    variables={{}}
    render={({ error, props }) => {
      if (error) {
        return error.message;
      } else if (props) {
        return (
          <Repository repository={props.viewer.repositories.edges[0].node} />
        );
      } else {
        return "Loading";
      }
    }}
  />
);

let environment;
beforeEach(() => {
  environment = createMockEnvironment();
});

test("Repository snapshot test", () => {
  const renderedComponent = render(<TestComponent environment={environment} />);

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation)
  );

  const fragment = renderedComponent.asFragment();
  expect(fragment).toMatchSnapshot();
});
