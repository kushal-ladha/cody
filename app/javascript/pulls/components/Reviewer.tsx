import React from "react";
import { Circle, CheckCircle } from "react-feather";
import { createFragmentContainer, graphql } from "react-relay";
import type {
  Reviewer_reviewer,
  ReviewerStatus,
} from "./__generated__/Reviewer_reviewer.graphql";

function statusToOcticon(status: ReviewerStatus) {
  switch (status) {
    case "APPROVED":
      return (
        <>
          <span className="sr-only">Approved</span>
          <CheckCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" />
        </>
      );
    case "PENDING_APPROVAL":
    default:
      return (
        <>
          <span className="sr-only">Pending approval</span>
          <Circle className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-300" />
        </>
      );
  }
}

function Reviewer({ reviewer }: { reviewer: Reviewer_reviewer }): JSX.Element {
  return (
    <li>
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex flex-1 items-center">
          <div className="flex-shrink-0">
            {statusToOcticon(reviewer.status)}
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p className="text-sm font-medium truncate" data-testid="reviewer-login">{reviewer.login}</p>
              {reviewer.reviewRule != null ? <p className="text-sm truncate text-gray-500" data-testid="review-rule-name">{reviewer.reviewRule.name}</p> : false}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default createFragmentContainer(Reviewer, {
  reviewer: graphql`
    fragment Reviewer_reviewer on Reviewer {
      id
      login
      status
      reviewRule {
        name
      }
    }
  `,
});
