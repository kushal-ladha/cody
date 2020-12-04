# typed: true
# frozen_string_literal: true

class SlackTeam < ApplicationRecord
  validates :name, presence: true
  validates :team_id, presence: true

  attr_encrypted :bot_access_token, key: :encryption_key

  private

  def encryption_key
    base64_key = Rails.application.secrets.attr_encrypted_key
    base64_key.unpack1("m")
  end
end
