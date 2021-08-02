require "rails_helper"

RSpec.describe LastPrReviewers do
	describe ".run" do
		let(:user1) {FactoryBot.create(:user)}
		let(:user2) {FactoryBot.create(:user)}
		let(:user3) {FactoryBot.create(:user)}
		let(:repository_1) {FactoryBot.create :repository}
		let(:repository_2) {FactoryBot.create :repository}
		let(:pr1) { FactoryBot.create :pull_request, status: "pending_review", repository_id: repository_1.id}
		let(:pr2) { FactoryBot.create :pull_request, status: "approved", repository_id: repository_1.id}
		let(:pr3) { FactoryBot.create :pull_request, status: "pending_review", repository_id: repository_2.id}
		let(:pr4) { FactoryBot.create :pull_request, status: "closed", repository_id: repository_1.id}
		let(:pr5) { FactoryBot.create :pull_request, status: "pending_review", repository_id: repository_1.id}

		before do
			FactoryBot.create(:reviewer, login: user1.login, pull_request: pr1)
			FactoryBot.create(:reviewer, login: user2.login, pull_request: pr2)
			FactoryBot.create(:reviewer, login: user2.login, pull_request: pr1)
			FactoryBot.create(:reviewer, login: user1.login, pull_request: pr5)
		end

		it "only finds pr which is not closed" do
			result = LastPrReviewers.new(pr5).run
			expect(result).to eq([user2.login])
		end

		it "should not give closed PRs" do
			FactoryBot.create(:reviewer, login: user3.login, pull_request: pr4)
			result = LastPrReviewers.new(pr5).run
			expect(result).to eq([user2.login])
		end

		it "should not give the result from different repository" do
			FactoryBot.create(:reviewer, login: user3.login, pull_request: pr3)
			result = LastPrReviewers.new(pr5).run
			expect(result).to eq([user2.login])
		end
	end
end
