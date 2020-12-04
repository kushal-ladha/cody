# typed: false
FactoryBot.define do
  factory :user do
    sequence(:login) { |x| "user#{x}" }
    sequence(:email) { |x| "user#{x}@example.com" }
    sequence(:name) { |x| "Test User #{x}" }
    sequence(:uid) { |x| x }
  end
end
