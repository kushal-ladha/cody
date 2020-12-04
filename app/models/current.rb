# typed: strict
# frozen_string_literal: true

class Current < ActiveSupport::CurrentAttributes
  attribute :user, :installation_id, :repository
end
