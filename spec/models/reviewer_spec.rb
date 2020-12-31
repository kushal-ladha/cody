require "rails_helper"
require "securerandom"

RSpec.describe Reviewer, type: :model do
  describe "#approve!" do
    subject(:reviewer) { FactoryBot.build :reviewer, status: "pending_approval" }

    it "sets the status to approved" do
      reviewer.approve!
      expect(reviewer.status).to eq("approved")
    end

    it "updates the approved_at timestamp" do
      Timecop.freeze do
        reviewer.approve!
        expect(reviewer.approved_at).to eq(Time.now.utc)
      end
    end
  end

  describe "#addendum" do
    let(:context) { SecureRandom.hex }
    let(:reviewer) { FactoryBot.build :reviewer, context: context }

    subject { reviewer.addendum }

    it { is_expected.to include(context) }

    it { is_expected.to match(%r{^- \[ \] @#{reviewer.login}$}) }

    it { is_expected.to include(reviewer.review_rule.name) }
  end

  describe "#status_to_check" do
    let(:reviewer) { FactoryBot.build :reviewer, status: status }

    subject { reviewer.status_to_check }

    context "when pending review" do
      let(:status) { Reviewer::STATUS_PENDING_APPROVAL }

      it { is_expected.to eq(" ") }
    end

    context "when approved" do
      let(:status) { Reviewer::STATUS_APPROVED }

      it { is_expected.to eq("x") }
    end
  end
end
