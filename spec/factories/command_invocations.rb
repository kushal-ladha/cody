# typed: false
FactoryBot.define do
  factory :command_invocation do
    sequence(:login) { |x| "user#{x}" }
    pull_request

    trait(:approval) do
      command { "cody approve" }
    end
  end
end
