import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import type {
  Reviewer_reviewer,
  ReviewerStatus
} from "./__generated__/Reviewer_reviewer.graphql";

function statusToOcticon(status: ReviewerStatus) {
  switch (status) {
    case "PENDING_APPROVAL":
      return (
        <span className="icon color-warning" title="Pending approval">
          <i className="far fa-circle" />
        </span>
      );
    case "APPROVED":
      return (
        <span className="icon color-success" title="Approved">
          <i className="fas fa-circle" />
        </span>
      );
    default:
      return status;
  }
}

const Reviewer = ({ reviewer }: { reviewer: Reviewer_reviewer }) => (
  <div className="level">
    <div className="level-left">
      <div className="level-item">{statusToOcticon(reviewer.status)}</div>
      <div className="level-item">
        <strong>{reviewer.login}</strong>
      </div>
      <div className="level-item">
        {reviewer.reviewRule != null ? reviewer.reviewRule.name : false}
      </div>
    </div>
  </div>
);

export default createFragmentContainer(
  Reviewer,
  {
    reviewer: graphql`
      fragment Reviewer_reviewer on Reviewer {
        id
        login
        status
        reviewRule {
          name
        }
      }
    `
  }
);
