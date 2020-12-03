import React from "react";
import { render } from "test-utils";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { QueryRenderer, graphql, Environment } from "react-relay";
import PullRequestDetail from "../PullRequestDetail";
import { PullRequestDetailTestSnapshotQuery } from "./__generated__/PullRequestDetailTestSnapshotQuery.graphql";

const TestComponent = ({ environment }: { environment: Environment }) => (
  <QueryRenderer<PullRequestDetailTestSnapshotQuery>
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
  const renderedComponent = render(<TestComponent environment={environment} />);

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation)
  );

  const fragment = renderedComponent.asFragment();
  expect(fragment).toMatchSnapshot();
});
