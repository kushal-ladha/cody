# typed: false
require 'rails_helper'

RSpec.describe SlackTeam, type: :model do
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :team_id }
end
