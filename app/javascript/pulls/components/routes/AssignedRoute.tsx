import React, { useReducer, useState } from "react";
import { Info } from "react-feather";
import environment from "../../environment";
import { graphql, QueryRenderer } from "react-relay";
import { useHistory, useLocation } from "react-router";
import Button from "../inputs/Button";
import ReviewDashboardResults from "../ReviewDashboardResults";
import PageHead from "./PageHead";
import { AssignedRouteQuery } from "./__generated__/AssignedRouteQuery.graphql";

type FilterState = {
  reviewRuleName?: string;
  repositoryName?: string;
};

function filterReducer<K extends keyof FilterState>(
  state: FilterState,
  action: { param: K; value: FilterState[K] }
): FilterState {
  return {
    ...state,
    [action.param]: action.value,
  };
}

function AssignedRoute(): JSX.Element {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [filterState, dispatchFilter] = useReducer(filterReducer, {
    reviewRuleName: query.get("review_rule") || "",
    repositoryName: query.get("repository") || "",
  });
  const history = useHistory();
  const [variables, setVariables] = useState(filterState);

  return (
    <>
      <PageHead title="Assigned Code Reviews" />

      <header>
        <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl leading-tight font-semibold text-gray-900">
            Assigned Code Reviews
          </h1>
        </div>
      </header>
      <div className="hidden sm:block max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <form>
          <div className="flex items-end space-x-6">
            <div>
              <label
                htmlFor="filter-review-rule"
                className="block text-sm font-medium text-gray-700 mr-2"
              >
                <p className="flex items-center text-sm text-gray-700">
                  Review Rule
                  <span title="Enter 'none' to search for manually assigned reviews.">
                    <Info className="h-4 w-4 ml-1.5 text-gray-500" />
                  </span>
                </p>
              </label>
              <div className="mt-2">
                <input
                  id="filter-review-rule"
                  type="text"
                  className="block shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-200 rounded-md"
                  value={filterState.reviewRuleName}
                  onChange={(event) =>
                    dispatchFilter({
                      param: "reviewRuleName",
                      value: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="filter-repository"
                className="block text-sm font-medium text-gray-700 mr-2"
              >
                <p className="flex items-center text-sm text-gray-700">
                  Repository
                  <span title="Enter the full Repository name with owner.">
                    <Info className="h-4 w-4 ml-1.5 text-gray-500" />
                  </span>
                </p>
              </label>
              <div className="mt-2">
                <input
                  id="filter-repository"
                  type="text"
                  placeholder="octocat/Spoon-Knife"
                  className="block shadow-sm placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-200 rounded-md"
                  value={filterState.repositoryName}
                  onChange={(event) =>
                    dispatchFilter({
                      param: "repositoryName",
                      value: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Button
                label="Filter"
                style="primary"
                onClick={(event) => {
                  event.preventDefault();
                  const params = new URLSearchParams();
                  if (
                    filterState.reviewRuleName != null &&
                    filterState.reviewRuleName != ""
                  ) {
                    params.set("review_rule", filterState.reviewRuleName);
                  }
                  if (
                    filterState.repositoryName != null &&
                    filterState.repositoryName != ""
                  ) {
                    params.set("repository", filterState.repositoryName);
                  }
                  history.replace({ search: params.toString() });
                  setVariables(filterState);
                }}
              />
            </div>
          </div>
        </form>
      </div>

      <QueryRenderer<AssignedRouteQuery>
        environment={environment}
        query={graphql`
          query AssignedRouteQuery(
            $reviewRuleName: String
            $repositoryName: String
          ) {
            viewer {
              ...ReviewDashboardResults_viewer
                @arguments(
                  reviewRuleName: $reviewRuleName
                  repositoryName: $repositoryName
                )
            }
          }
        `}
        variables={variables}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return <ReviewDashboardResults environment={environment} viewer={props.viewer} />;
          }
          return null;
        }}
      />
    </>
  );
}

export default AssignedRoute;
