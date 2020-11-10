import React from "react";
import { render, screen } from "@testing-library/react";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { QueryRenderer, graphql } from "react-relay";
import { MemoryRouter } from "react-router";
import PullRequest from "../PullRequest";
import "@testing-library/jest-dom/extend-expect";

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

test("PullRequest generates a link to view the details", () => {
  render(<TestComponent environment={environment} />, {
    wrapper: MemoryRouter,
  });

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, {
      PullRequest(_, generateId) {
        return {
          id: `test-id-${generateId()}`,
          repository: "test/test",
          number: "42",
          status: "APPROVED",
        };
      }
    })
  );

  expect(screen.queryByRole("link")).toHaveAttribute("href", "/repos/test/test/pull/42");
})