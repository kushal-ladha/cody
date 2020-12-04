# typed: strict
# frozen_string_literal: true

class Installation < ApplicationRecord
  has_many :repositories
end
