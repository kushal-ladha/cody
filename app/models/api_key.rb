# typed: strict
# frozen_string_literal: true

class ApiKey < ApplicationRecord
  belongs_to :user
  has_secure_password
end
