require "rails_helper"

RSpec.describe UserPreference, type: :model do
  it { is_expected.to belong_to :user }

  describe "#schedule_unpause" do
    subject(:pref) { FactoryBot.create :user_preference, paused: initial_state }

    context "when paused changed from false to true" do
      let(:initial_state) { false }

      it "schedules unpause for 2 weeks from now" do
        Timecop.freeze do
          pref.paused = true
          pref.save!

          expect(Sidekiq::Extensions::DelayedClass.jobs.size).to eq(1)
          job = Sidekiq::Extensions::DelayedClass.jobs[0]
          expect(job["at"]).to be_within(0.0001).of(2.weeks.from_now.to_f)
        end
      end
    end

    context "when paused changed from true to false" do
      let(:initial_state) { true }

      it "does not schedule unpause" do
        pref.paused = false
        pref.save!

        expect(Sidekiq::Extensions::DelayedClass.jobs.size).to eq(0)
      end
    end

    context "when paused did not change" do
      let(:initial_state) { true }

      it "does not schedule unpause" do
        pref.paused = true
        pref.save!

        expect(Sidekiq::Extensions::DelayedClass.jobs.size).to eq(0)
      end
    end
  end
end
