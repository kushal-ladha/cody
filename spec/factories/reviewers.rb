# typed: false
require 'securerandom'

FactoryBot.define do
  factory :reviewer do
    login { SecureRandom.hex }
    review_rule
    pull_request
  end
end
