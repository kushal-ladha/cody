require "rails_helper"

RSpec.describe "Pull Requests flow", type: :system do
  let!(:user) { FactoryBot.create :user }
  let!(:pull_requests) { FactoryBot.create_list :pull_request, 5 }

  before do
    mock_auth(
      :github,
      {
        uid: 4,
        info: {
          nickname: user.login,
          email: user.email,
          name: user.name
        },
        credentials: {
          token: "abc"
        }
      }
    )

    pr = pull_requests.first
    FactoryBot.create :reviewer, pull_request: pr, review_rule: nil
    2.times do |x|
      # These ones will have a review rule associated
      FactoryBot.create :reviewer, pull_request: pr
    end

    stubbed_installation_ids = pull_requests.map { |pr| {id: pr.repository.installation.github_id} }
    stub_request(:get, "https://api.github.com/user/installations")
      .to_return(
        status: 200,
        body: JSON.dump({installations: stubbed_installation_ids}),
        headers: {"Content-Type" => "application/json"}
      )

    pull_requests.each do |pr|
      installation_id = pr.repository.installation.github_id
      stub_request(:get, "https://api.github.com/user/installations/#{installation_id}/repositories")
        .to_return(
          status: 200,
          body: JSON.dump({repositories: [{id: pr.repository.github_id}]}),
          headers: {"Content-Type" => "application/json"}
        )
    end
  end

  it "allows drilling down to a single Pull Request", aggregate_failures: true do
    visit "/"

    click_on "Sign in with GitHub"

    expect(page).to have_text("Cody")

    pull_requests.each do |pr|
      expect(page).to have_text(pr.repository.full_name)
    end

    click_on pull_requests.first.repository.full_name

    pull_requests.first.repository.pull_requests.each do |pr|
      expect(page).to have_text("#{pull_requests.first.repository.full_name}##{pr.number}")
    end

    click_on "#{pull_requests.first.repository.full_name}##{pull_requests.first.number}"

    pull_requests.first.reviewers.each do |reviewer|
      expect(page).to have_content(reviewer.login)
      if reviewer.review_rule
        expect(page).to have_content(reviewer.review_rule.name)
      end
    end
  end
end
