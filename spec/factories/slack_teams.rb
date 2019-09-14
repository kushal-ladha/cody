# typed: false
FactoryBot.define do
  factory :slack_team do
    name "My Slack Team"
    sequence(:team_id) { |x| "T#{x}" }
  end
end
