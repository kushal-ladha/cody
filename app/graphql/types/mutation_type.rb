# typed: strict
# frozen_string_literal: true

class Types::MutationType < Types::BaseObject
  description "The mutation root"

  field :update_user, field: Mutations::UpdateUser.field, null: true
end
