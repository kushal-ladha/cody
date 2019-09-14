# typed: false
require "rails_helper"

RSpec.describe SummaryMailer, type: :mailer do
  describe ".send_new_reviews_summary" do
    let!(:user) { FactoryBot.create :user }

    before do
      user.build_user_preference
      user.user_preference.send_new_reviews_summary = true
      user.save!
    end

    context "at 9 on a weekday" do
      it "sends mails to users" do
        Timecop.freeze(Time.zone.local(2019, 2, 11, 9)) do
          expect(SummaryMailer).to receive(:new_reviews).with(user).once.and_call_original
          SummaryMailer.send_new_reviews_summary
        end
      end
    end

    context "on weekends" do
      it "does not send mails" do
        Timecop.freeze(Time.zone.local(2019, 2, 10)) do
          expect(SummaryMailer).to_not receive(:new_reviews)
          SummaryMailer.send_new_reviews_summary
        end
      end
    end

    context "at any other hour on weekdays" do
      it "does not send mails" do
        Timecop.freeze(Time.zone.local(2019, 2, 11, 16)) do
          expect(SummaryMailer).to_not receive(:new_reviews)
          SummaryMailer.send_new_reviews_summary
        end
      end
    end
  end
end
