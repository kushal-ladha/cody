# frozen_string_literal: true

class Types::ReviewerType < Types::BaseObject
  implements GraphQL::Types::Relay::Node

  global_id_field :id

  field :login, String, null: false
  field :status, Types::ReviewerStatusType, null: false

  field :pull_request, Types::PullRequestType, null: false

  field :review_rule, Types::ReviewRuleType,
    description: "The Review Rule that added this Reviewer",
    null: true

  def review_rule
    @object.review_rule
  end
end
