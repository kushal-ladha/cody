# typed: strict
# frozen_string_literal: true

class Types::MutationType < Types::BaseObject
  description "The mutation root"

  field :update_user, mutation: Mutations::UpdateUser
end
