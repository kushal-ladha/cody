import React from "react";
import { Circle, CheckCircle } from "react-feather";
import { createFragmentContainer, graphql } from "react-relay";
import type {
  Reviewer_reviewer,
  ReviewerStatus,
} from "./__generated__/Reviewer_reviewer.graphql";

function statusToOcticon(status: ReviewerStatus) {
  switch (status) {
    case "PENDING_APPROVAL":
      return (
        <span className="icon color-warning" title="Pending approval">
          <Circle />
        </span>
      );
    case "APPROVED":
      return (
        <span className="icon color-success" title="Approved">
          <CheckCircle />
        </span>
      );
    default:
      return status;
  }
}

function Reviewer({ reviewer }: { reviewer: Reviewer_reviewer }): JSX.Element {
  return (
    <div className="level">
      <div className="level-left">
        <div className="level-item">{statusToOcticon(reviewer.status)}</div>
        <div className="level-item">
          <strong data-testid="reviewer-login">{reviewer.login}</strong>
        </div>
        <div className="level-item" data-testid="review-rule-name">
          {reviewer.reviewRule != null ? reviewer.reviewRule.name : false}
        </div>
      </div>
    </div>
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
