# typed: false
require "rails_helper"

RSpec.describe ReceiveInstallationRepositoriesEvent, type: :model do
  it "creates a Repository for each name" do
    expect(Repository).to receive(:find_or_initialize_by).with(owner: "test-ops", name: "test-base").and_return(instance_double(Repository, new_record?: false, save!: true, "installation=": true, "github_id=": true))
    expect(Repository).to receive(:find_or_initialize_by).with(owner: "test-ops", name: "test-app").and_return(instance_double(Repository, new_record?: false, save!: true, "installation=": true, "github_id=": true))
    expect(Repository).to receive(:find_or_initialize_by).with(owner: "test-ops", name: "test-db").and_return(instance_double(Repository, new_record?: true, save!: true, full_name: "test-ops/test-db", "installation=": true, "github_id=": true))

    expect(ReceivePushEvent).to receive(:perform_async).once

    ReceiveInstallationRepositoriesEvent.new.perform([{"id" => 1, "name" => "test-base", "full_name" => "test-ops/test-base", "private" => true}, {"id" => 2, "name" => "test-app", "full_name" => "test-ops/test-app", "private" => true}, {"id" => 3, "name" => "test-db", "full_name" => "test-ops/test-db", "private" => true}])
  end
end
