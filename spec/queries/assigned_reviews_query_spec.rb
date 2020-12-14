# typed: false
require "rails_helper"

RSpec.describe AssignedReviewsQuery do
  describe ".run" do
    it "only finds reviews for the specified login" do
      user = FactoryBot.create(:user)
      users_reviews = FactoryBot.create_list(:reviewer, 3, login: user.login)
      _other_reviews = FactoryBot.create_list(:reviewer, 3)

      result = AssignedReviewsQuery.run(login: user.login)

      expect(result).to contain_exactly(*users_reviews)
    end

    it "finds reviews scoped by status" do
      user = FactoryBot.create(:user)
      users_reviews = FactoryBot.create_list(:reviewer, 3, login: user.login, status: "pending_review")
      _other_reviews = FactoryBot.create_list(:reviewer, 3, login: user.login, status: "approved")

      result = AssignedReviewsQuery.run(login: user.login, status: "pending_review")

      expect(result).to contain_exactly(*users_reviews)
    end

    it "finds reviews scoped by review rule name" do
      user = FactoryBot.create(:user)
      review_rule = FactoryBot.create(:review_rule)
      users_reviews = FactoryBot.create_list(:reviewer, 3, login: user.login, review_rule: review_rule)
      _other_reviews = FactoryBot.create_list(:reviewer, 3, login: user.login)

      result = AssignedReviewsQuery.run(login: user.login, review_rule_name: review_rule.name)

      expect(result).to contain_exactly(*users_reviews)
    end

    it "finds reviews scoped by repository name" do
      user = FactoryBot.create(:user)
      repo = FactoryBot.create(:repository)
      users_reviews = FactoryBot.create_list(:reviewer, 3, login: user.login)
      users_reviews.each do |r|
        r.pull_request.repository = repo
        r.pull_request.save!
      end
      _other_reviews = FactoryBot.create_list(:reviewer, 3, login: user.login)

      result = AssignedReviewsQuery.run(login: user.login, repository_name: repo.full_name)

      expect(result).to contain_exactly(*users_reviews)
    end
  end
end
