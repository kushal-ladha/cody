# typed: false
FactoryBot.define do
  factory :slack_identity do
    sequence(:uid) { |x| "U#{x}" }
    user
    slack_team
  end
end
