import React from "react";
import Reviewer from "./Reviewer";
import { createFragmentContainer, graphql } from "react-relay";
import { PullRequestDetail_pullRequest } from "./__generated__/PullRequestDetail_pullRequest.graphql";
import Container from "./Container";
import { GitPullRequest } from "react-feather";

function humanStatus(status: string): string {
  switch (status) {
    case "pending_review":
      return "Pending Review";
    case "approved":
      return "Approved";
    case "closed":
      return "Closed";
    default:
      return status;
  }
}

function PullRequestDetail({
  pullRequest,
}: {
  pullRequest: PullRequestDetail_pullRequest;
}): JSX.Element {
  return (
    <Container>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="divide-y divide-gray-200">
          <div className="flex items-center py-4 px-4 sm:px-6">
            <div className="min-w-0 flex flex-1 items-center">
              <div className="flex-shrink-0">
                <GitPullRequest />
              </div>
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    {`${pullRequest.repository} #${pullRequest.number}`}
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    {humanStatus(pullRequest.status)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ul>
              {pullRequest.reviewers != null &&
              pullRequest.reviewers.edges != null
                ? pullRequest.reviewers.edges.map((edge) => {
                    if (edge != null && edge.node != null) {
                      // https://github.com/facebook/relay/issues/1918
                      return (
                        <Reviewer key={edge.node.id} reviewer={edge.node} />
                      );
                    }
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default createFragmentContainer(PullRequestDetail, {
  pullRequest: graphql`
    fragment PullRequestDetail_pullRequest on PullRequest {
      id
      repository
      number
      status
      reviewers {
        edges {
          node {
            id
            ...Reviewer_reviewer
          }
        }
      }
    }
  `,
});
