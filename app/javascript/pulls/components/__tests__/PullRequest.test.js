import React from "react";
import { render } from "@testing-library/react";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { QueryRenderer, graphql } from "react-relay";
import { MemoryRouter } from "react-router";
import PullRequest from "../PullRequest";

const TestComponent = ({ environment }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query PullRequestTestSnapshotQuery @relay_test_operation {
        viewer {
          repository(owner: "test", name: "test") {
            pullRequests(first: 10) {
              edges {
                node {
                  ...PullRequest_pullRequest
                }
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
          <PullRequest pullRequest={props.viewer.repository.pullRequests.edges[0].node} />
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

test("PullRequest snapshot test", () => {
  let renderedComponent = render(<TestComponent environment={environment} />, { wrapper: MemoryRouter });

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation)
  );

  let fragment = renderedComponent.asFragment();
  expect(fragment).toMatchSnapshot();
});
