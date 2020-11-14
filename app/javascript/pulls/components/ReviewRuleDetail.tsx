import React from "react";
import TextField from "./inputs/TextField";
import { createFragmentContainer, graphql } from "react-relay";
import { ReviewRuleDetail_reviewRule } from "./__generated__/ReviewRuleDetail_reviewRule.graphql";

function ReviewRuleDetail({
  reviewRule,
}: {
  reviewRule: ReviewRuleDetail_reviewRule;
}): JSX.Element {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <h1 className="title">{reviewRule.name}</h1>
              <TextField
                label="Repository"
                name="repository"
                value={reviewRule.repository}
                readonly
              />

              <TextField
                label="Short Code"
                name="short_code"
                value={reviewRule.shortCode}
                readonly
              />

              <TextField
                label="Type"
                name="type"
                value={reviewRule.type}
                readonly
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default createFragmentContainer(ReviewRuleDetail, {
  reviewRule: graphql`
    fragment ReviewRuleDetail_reviewRule on ReviewRule {
      id
      repository
      name
      shortCode
      type
      reviewer
      match
    }
  `,
});
