# typed: strict
# frozen_string_literal: true

class Types::ReviewerType < Types::BaseObject
  implements GraphQL::Types::Relay::Node

  global_id_field :id

  field :login, String, null: false
  field :status, Types::ReviewerStatusType, null: false

  field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

  field :review_rule, Types::ReviewRuleType,
    description: "The Review Rule that added this Reviewer",
    null: true

  field :pull_request, Types::PullRequestType,
    description: "The Pull Request this Reviewer is assigned to",
    null: false
end
