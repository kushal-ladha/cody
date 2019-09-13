FactoryBot.define do
  factory :pull_request do
    status { "pending_review" }
    sequence(:number)
    repository
  end

  sequence(:pull_request_number)
end
