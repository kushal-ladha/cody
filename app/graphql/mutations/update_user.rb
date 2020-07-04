# frozen_string_literal: true

Mutations::UpdateUser = GraphQL::Relay::Mutation.define {
  name "UpdateUser"
  description "Update the currently authenticated user"
  return_field :user, Types::UserType

  input_field :email, !types.String
  input_field :sendNewReviewsSummary, !types.Boolean
  input_field :paused, !types.Boolean
  input_field :timezone, !types.String

  resolve ->(obj, args, ctx) {
    ctx[:current_user].update!(email: args[:email])
    unless ctx[:current_user].user_preference.present?
      ctx[:current_user].build_user_preference
    end
    ctx[:current_user].user_preference.update!(
      send_new_reviews_summary: args[:sendNewReviewsSummary],
      paused: args[:paused],
      timezone: args[:timezone]
    )

    {
      user: ctx[:current_user]
    }
  }
}
