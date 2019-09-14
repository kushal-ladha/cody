# typed: strong
# frozen_string_literal: true

class UserPreference < ApplicationRecord
  belongs_to :user, inverse_of: :user_preference

  scope :paused, -> { where(paused: true) }
end
