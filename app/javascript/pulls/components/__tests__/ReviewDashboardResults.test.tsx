import React from "react";
import { render, screen } from "test-utils";
import userEvent from "@testing-library/user-event";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { Environment, graphql, QueryRenderer } from "react-relay";
import ReviewDashboardResults from "../ReviewDashboardResults";
import { ReviewDashboardResultsSnapshotQuery } from "./__generated__/ReviewDashboardResultsSnapshotQuery.graphql";

const TestComponent = ({ environment }: { environment: Environment }) => (
  <QueryRenderer<ReviewDashboardResultsSnapshotQuery>
    environment={environment}
    query={graphql`
      query ReviewDashboardResultsSnapshotQuery @relay_test_operation {
        viewer {
          ...ReviewDashboardResults_viewer
        }
      }
    `}
    variables={{}}
    render={({ error, props }) => {
      if (error) {
        return error.message;
      } else if (props) {
        return <ReviewDashboardResults environment={environment} viewer={props.viewer} />;
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

test("ReviewDashboardResults snapshot test", () => {
  const rendered = render(<TestComponent environment={environment} />);

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, {
      ISO8601DateTime() {
        return "2020-11-30T00:33:49.973Z";
      },
      PageInfo() {
        return {
          hasNextPage: true,
          hasPreviousPage: false
        }
      }
    })
  );

  const fragment = rendered.asFragment();
  expect(fragment).toMatchSnapshot();

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, {
      PullRequest() {
        return {
          title: "My Remote Title",
          htmlUrl: "https://example.local",
        };
      }
    })
  ); 

  const fragment_after_lazy_external_query = rendered.asFragment();
  expect(fragment_after_lazy_external_query).toMatchSnapshot();

  userEvent.click(screen.getByText("Load More"));
  const fragment_while_loading = rendered.asFragment();
  expect(fragment_while_loading).toMatchSnapshot();
});

test("ReviewDashboardResults snapshot test with no results", () => {
  const rendered = render(<TestComponent environment={environment} />);

  environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, {
      ReviewerConnection() {
        return {
          edges: null,
        };
      },
    })
  );

  const fragment = rendered.asFragment();
  expect(fragment).toMatchSnapshot();
});
