# typed: true
# frozen_string_literal: true

class ApplyReviewRules
  attr_reader :pr, :pull_request_hash

  def initialize(pr, pull_request_hash)
    @pr = pr
    @pull_request_hash = pull_request_hash
  end

  def perform
    # Quit if there aren't any rules for this repo
    ReviewRule.apply(pr, pull_request_hash)

    reviewers = pr.generated_reviewers
    return if reviewers.empty?

    pr.reload
    pr.update_body
    pr.update_labels
  end
end
