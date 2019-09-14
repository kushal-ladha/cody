# typed: false
require "rails_helper"

RSpec.describe Installation, type: :model do
  it { is_expected.to have_many :repositories }
end
