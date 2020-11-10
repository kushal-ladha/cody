import React from "react";
import { render } from "@testing-library/react";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { QueryRenderer, graphql } from "react-relay";
import PullRequestDetail from "../PullRequestDetail";

const TestComponent = ({ environment }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query PullRequestDetailTestSnapshotQuery @relay_test_operation {
        viewer {
          repository(owner: "test", name: "test") {
            pullRequest(number: "42") {
              ...PullRequestDetail_pullRequest
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
          <PullRequestDetail pullRequest={props.viewer.repository.pullRequest} />
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

test("PullRequestDetail snapshot test", () => {
  let renderedComponent = render(<TestComponent environment={environment} />);

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation)
  );

  let fragment = renderedComponent.asFragment();
  expect(fragment).toMatchSnapshot();
});
