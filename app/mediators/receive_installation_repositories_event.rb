# typed: true
# frozen_string_literal: true

class ReceiveInstallationRepositoriesEvent
  include Sidekiq::Worker

  def perform(repositories, installation_id = nil)
    installation =
      if installation_id
        Current.installation_id = installation_id
        Installation.find_or_create_by(github_id: installation_id)
      end

    repositories.each do |repository|
      owner, name = repository["full_name"].split("/", 2)
      repo = Repository.find_or_initialize_by(owner: owner, name: name)
      repo.github_id = repository["id"]
      repo.installation = installation
      repo.save!
      if repo.new_record?
        ReceivePushEvent.perform_async(repo.full_name, installation_id)
      end
    end

    Current.reset
  end
end
