# typed: false
require "rails_helper"

RSpec.describe SlackIdentity, type: :model do
  subject { FactoryBot.create(:slack_identity) }

  it { is_expected.to validate_presence_of :uid }
  it { is_expected.to validate_uniqueness_of(:uid).scoped_to(:slack_team_id) }

  it { is_expected.to belong_to :user }
  it { is_expected.to belong_to :slack_team }
end
