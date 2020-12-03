import React from "react";
import { render, screen } from "test-utils";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { QueryRenderer, graphql, Environment } from "react-relay";
import PullRequest from "../PullRequest";
import "@testing-library/jest-dom/extend-expect";
import { PullRequestTestSnapshotQuery } from "./__generated__/PullRequestTestSnapshotQuery.graphql";

const TestComponent = ({ environment }: { environment: Environment }) => (
  <QueryRenderer<PullRequestTestSnapshotQuery>
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
          <PullRequest
            pullRequest={props.viewer.repository.pullRequests.edges[0].node}
          />
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
  const renderedComponent = render(<TestComponent environment={environment} />);

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation)
  );

  const fragment = renderedComponent.asFragment();
  expect(fragment).toMatchSnapshot();
});

test("PullRequest generates a link to view the details", () => {
  render(<TestComponent environment={environment} />);

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, {
      PullRequest(_, generateId) {
        return {
          id: `test-id-${generateId()}`,
          repository: "test/test",
          number: "42",
          status: "approved",
        };
      },
    })
  );

  expect(screen.queryByRole("link")).toHaveAttribute(
    "href",
    "/repos/test/test/pull/42"
  );
});

test.each([
  ["approved", "Approved"],
  ["pending_review", "Pending Review"],
  ["closed", "Closed"],
])('PullRequest with status: `%s` shows message: "%s"', (status, message) => {
  render(<TestComponent environment={environment} />);

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, {
      PullRequest(_, generateId) {
        return {
          id: `test-id-${generateId()}`,
          repository: "test/test",
          number: "42",
          status,
        };
      },
    })
  );

  expect(screen.getByTestId("pull-request-status")).toHaveTextContent(message);
});
