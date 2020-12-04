# typed: strict
# frozen_string_literal: true

class SlackIdentity < ApplicationRecord
  validates :uid, presence: true, uniqueness: {scope: :slack_team_id}

  belongs_to :user, required: true
  belongs_to :slack_team, required: true
end
