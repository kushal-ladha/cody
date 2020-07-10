# frozen_string_literal: true

class UserPreference < ApplicationRecord
  belongs_to :user, inverse_of: :user_preference

  scope :paused, -> { where(paused: true) }

  after_commit :schedule_unpause, if: -> { saved_change_to_paused?(from: false, to: true) }

  private

  def schedule_unpause
    UserPreference.delay_for(2.weeks).update(id, paused: false)
  end
end
