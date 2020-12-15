require "rails_helper"

RSpec.describe RepositoryPolicy do
  describe "Scope" do
    let(:accessible_repos) { FactoryBot.create_list :repository, 3 }
    let(:inaccessible_repos) { FactoryBot.create_list :repository, 2 }
    let(:accessible_installations) { accessible_repos.map(&:installation) }

    let(:user) { FactoryBot.create :user }

    before do
      expect(user).to receive(:accessible_installations).and_return(accessible_installations)
      accessible_repos.each do |repository|
        installation_id = repository.installation.github_id
        stub_request(:get, "https://api.github.com/user/installations/#{installation_id}/repositories")
          .to_return(
            status: 200,
            body: JSON.dump({repositories: [{id: repository.github_id}]}),
            headers: {"Content-Type" => "application/json"}
          )
      end
    end

    subject(:scope) { Pundit.policy_scope(user, Repository) }

    it "excludes repositories which belong to installations that the user does not have access to" do
      expect(scope).to contain_exactly(*accessible_repos)
    end
  end
end
