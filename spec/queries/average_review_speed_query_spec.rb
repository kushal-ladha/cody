# typed: false
require "rails_helper"

RSpec.describe AverageReviewSpeedQuery do
  describe "#run" do
    subject(:query) do
      AverageReviewSpeedQuery.new(login: login, since: since)
    end

    let(:login) { "aergonaut" }
    let(:since) { 20.days.ago }

    it "correctly calculates the average and returns it as a Duration of days" do
      pr1 =
        Timecop.freeze(17.days.ago) {
          FactoryBot.create :pull_request
        }

      ci1 =
        Timecop.freeze(15.days.ago) {
          FactoryBot.create :command_invocation, :approval, login: login, pull_request: pr1
        }

      pr2 =
        Timecop.freeze(9.days.ago) {
          FactoryBot.create :pull_request
        }

      ci2 =
        Timecop.freeze(8.days.ago) {
          FactoryBot.create :command_invocation, :approval, login: login, pull_request: pr2
        }

      expected = ((ci1.created_at - pr1.created_at) + (ci2.created_at - pr2.created_at)) / 2.0 / ActiveSupport::Duration::SECONDS_PER_DAY
      expect(query.run).to be_within(0.1).of(expected.days)
    end
  end
end
