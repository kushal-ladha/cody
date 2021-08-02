require "rails_helper"

RSpec.describe AverageReviewLoad do
	describe ".run" do
		it "only finds reviews for the specified login" do
			user = FactoryBot.create(:user)
			FactoryBot.create_list(:reviewer, 3, login: user.login)
			result = AverageReviewLoad.new(user.login).run
			expect(result).to eq({user.login => 3})
		end

		it "finds reviews created within last 1 week" do
			user = FactoryBot.create(:user)
			FactoryBot.create_list(:reviewer, 3, login: user.login)
			FactoryBot.create_list(:reviewer, 3, login: user.login, created_at: Time.now - 8.days)
			result = AverageReviewLoad.new(user.login).run

			expect(result).to eq({user.login => 3})
		end

		it "respond with the count for each reviewers login" do
			user1 = FactoryBot.create(:user)
			user2 = FactoryBot.create(:user)
			FactoryBot.create_list(:reviewer, 3, login: user1.login)
			FactoryBot.create_list(:reviewer, 2, login: user2.login)
			result = AverageReviewLoad.new([user1.login, user2.login]).run

			expect(result).to eq({user1.login => 3, user2.login => 2})
		end
	end
end
