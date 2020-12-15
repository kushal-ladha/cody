# frozen_string_literal: true

class RepositoryPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      accessible_installations = user.accessible_installations
      installation_ids = accessible_installations.pluck(:github_id)
      repository_ids =
        installation_ids.flat_map { |installation_id|
          response = github_client.find_installation_repositories_for_user(installation_id)
          response.repositories&.map(&:id)
        }

      scope.where(github_id: repository_ids)
    end

    private

    def github_client
      @github_client ||= Octokit::Client.new(access_token: user.access_key)
    end
  end
end
