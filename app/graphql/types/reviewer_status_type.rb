# typed: strict
# frozen_string_literal: true

class Types::ReviewerStatusType < Types::BaseEnum
  description "The review status of a Reviewer"

  value "PENDING_APPROVAL",
    description: "Pending Approval",
    value: Reviewer::STATUS_PENDING_APPROVAL

  value "APPROVED",
    description: "Approved",
    value: Reviewer::STATUS_APPROVED
end
