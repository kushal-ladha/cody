# typed: false
# frozen_string_literal: true

# This class is solely for responding to push events as a cue that the config
# file may have changed. This worker uses sidekiq-unique-jobs to restrict the
# number of config refreshes that may be happening at any given time to one per
# repository.
class ReceivePushEvent
  include Sidekiq::Worker

  sidekiq_options unique: :while_executing

  def perform(full_name, installation_id = nil)
    if installation_id
      Current.installation_id = installation_id
    end

    Repository.transaction do
      repository = Repository.find_by_full_name(full_name)
      repository.refresh_config!
    end

    Current.reset
  end
end
