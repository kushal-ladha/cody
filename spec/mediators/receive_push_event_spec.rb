# typed: false
require "rails_helper"

RSpec.describe ReceivePushEvent, type: :model do
  let(:repo) { FactoryBot.create :repository }

  before do
    expect(Repository).to receive(:find_by_full_name).with(repo.full_name).and_return(repo)
    expect(repo).to receive(:refresh_config!)
  end

  it "calls refresh_config! on the repository" do
    ReceivePushEvent.new.perform(repo.full_name)
  end
end
