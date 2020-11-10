import React from "react";
import { render } from "@testing-library/react";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { QueryRenderer, graphql } from "react-relay";
import { MemoryRouter } from "react-router";
import Repository from "../Repository";

const TestComponent = ({ environment }) => (
  <QueryRenderer
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
  let renderedComponent = render(<TestComponent environment={environment} />, { wrapper: MemoryRouter });

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation)
  );

  let fragment = renderedComponent.asFragment();
  expect(fragment).toMatchSnapshot();
});
