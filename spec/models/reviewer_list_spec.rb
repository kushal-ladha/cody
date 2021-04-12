# rubocop:disable Naming/VariableName
require "rails_helper"

RSpec.describe ReviewerList do
  describe "#choose_reviewer" do
    before do
      @pull_request_1 = FactoryBot.create :pull_request, status: "pending_review"
    end

    it "does not pick users who are in the exclude_list" do
      exclude_list = ["aergonaut"]
      list = ReviewerList.new(reviewers: ["aergonaut", "robertmonahon"])
      chosen_reviewer = list.choose_reviewer(@pull_request_1, exclude_list: exclude_list)
      expect(chosen_reviewer.login).to eq("robertmonahon")
    end

    it "returns nil when all users are excluded" do
      exclude_list = ["aergonaut", "robertmonahon"]
      list = ReviewerList.new(reviewers: ["aergonaut", "robertmonahon"])
      chosen_reviewer = list.choose_reviewer(@pull_request_1, exclude_list: exclude_list)
      expect(chosen_reviewer).to be_nil
    end

    it "implicitly excludes users with `indicatesLimitedAvailability`" do
      reviewers =
        [
          UserWithStatus.new(login: "aergonaut", indicatesLimitedAvailability: false),
          UserWithStatus.new(login: "robertmonahon", indicatesLimitedAvailability: true)
        ]

      list = ReviewerList.new(reviewers: reviewers)
      chosen_reviewer = list.choose_reviewer(@pull_request_1, exclude_list: [])
      expect(chosen_reviewer.login).to eq("aergonaut")
    end

    context "load balancing while choosing the reviewer" do
      before do
        @repository = FactoryBot.create :repository
        @pull_request_1 = FactoryBot.create :pull_request, status: "pending_review", repository: @repository, created_at: Time.now
        @pull_request_2 = FactoryBot.create :pull_request, status: "pending_review", repository: @repository, created_at: Time.now
        FactoryBot.create :reviewer, status: "pending_approval", pull_request: @pull_request_1, login: "aergonaut", created_at: Time.now
        FactoryBot.create :reviewer, status: "pending_approval", pull_request: @pull_request_1, login: "robertmonahon", created_at: Time.now
        FactoryBot.create :reviewer, status: "pending_approval", login: "xyz", created_at: 1.month.ago
        @pull_request_1.reload
      end

      it "should load balance reviewers based on last 7 days assignment" do
        list = ReviewerList.new(reviewers: ["aergonaut", "robertmonahon", "xyz"])
        chosen_reviewer = list.choose_reviewer(@pull_request_2, exclude_list: [])
        expect(chosen_reviewer.login).to eq("xyz")
      end
    end
  end

  # mock objects to handle the GraphQL response
  class UserWithStatus
    attr_reader :login
    attr_reader :status

    def initialize(login:, indicatesLimitedAvailability:)
      @login = login
      @status = UserStatus.new(indicatesLimitedAvailability: indicatesLimitedAvailability)
    end

    class UserStatus
      attr_reader :indicatesLimitedAvailability

      def initialize(indicatesLimitedAvailability:)
        @indicatesLimitedAvailability = indicatesLimitedAvailability
      end

      def indicates_limited_availability?
        @indicatesLimitedAvailability
      end
    end
  end
end
# rubocop:enable Naming/VariableName
