import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import Container from "./Container";
import { ReviewRuleList_repository } from "./__generated__/ReviewRuleList_repository.graphql";

function ReviewRuleList({
  repository,
}: {
  repository: ReviewRuleList_repository;
}): JSX.Element {
  return (
    <Container>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short Code
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviewer
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Match
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {repository.reviewRules != null &&
                  repository.reviewRules.edges != null
                    ? repository.reviewRules.edges.map((edge) => {
                        if (edge != null && edge.node != null) {
                          return (
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {edge.node.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {edge.node.shortCode}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {edge.node.reviewer}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {edge.node.match}
                              </td>
                            </tr>
                          );
                        }
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default createFragmentContainer(ReviewRuleList, {
  repository: graphql`
    fragment ReviewRuleList_repository on Repository {
      owner
      name
      reviewRules(first: 200, after: $cursor)
        @connection(key: "ReviewRuleList_reviewRules") {
        edges {
          node {
            id
            name
            shortCode
            match
            reviewer
          }
        }
      }
    }
  `,
});
