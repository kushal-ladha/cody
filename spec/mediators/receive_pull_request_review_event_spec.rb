# typed: false
require "rails_helper"

RSpec.describe ReceivePullRequestReviewEvent do
  let(:repo) { FactoryBot.create :repository }
  let(:pull_request) { FactoryBot.create :pull_request, repository: repo }
  let(:sender) { "aergonaut" }

  let(:payload) do
    json_fixture(
      "pull_request_review",
      repo: {name: repo.name, owner: repo.owner},
      pull_request: {number: pull_request.number},
      sender: sender,
      state: state,
      action: action
    )
  end

  let(:job) { ReceivePullRequestReviewEvent.new }

  subject { job.perform(payload) }

  context "when action is submitted" do
    let(:action) { "submitted" }

    context "when the review state is approved" do
      let(:state) { "approved" }

      context "when the sender is not a reviewer" do
        let(:reviewers) { FactoryBot.create_list :reviewer, 3, pull_request: pull_request }

        it "does not call approve on any reviewer" do
          expect { subject }.to_not change { reviewers.each { _1.reload }.map(&:status) }
        end
      end

      context "when the sender is a reviewer" do
        let(:subject_reviewer) { FactoryBot.create :reviewer, pull_request: pull_request, login: sender }
        let(:pr_response_body) { json_fixture("pr") }

        before do
          stub_request(:post, %r(https?://api.github.com/repos/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+/statuses/[0-9abcdef]{40}))
          stub_request(:get, %r{https?://api.github.com/repos/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+/pulls/\d+}).to_return(
            body: JSON.dump(pr_response_body),
            status: 200,
            headers: {"Content-Type" => "application/json"}
          )
          stub_request(:patch, %r{https?://api.github.com/repos/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+/issues/\d+})
          stub_request(:patch, %r{https://api.github.com/repos/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+/pulls/\d+})
          stub_request(:post, %r{https?://api.github.com/repos/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+/pulls/\d+/requested_reviewers})
        end

        it "changes the sender's review to approved" do
          expect { subject }.to change { subject_reviewer.reload.status }.from(Reviewer::STATUS_PENDING_APPROVAL).to(Reviewer::STATUS_APPROVED)
        end
      end
    end

    context "when the review state is not approved" do
      let(:state) { "commented" }

      it "does not call on_approve" do
        expect(job).to_not receive(:on_approve)
        subject
      end
    end
  end

  context "when action is dismissed" do
    let(:action) { "dismissed" }
    let(:state) { "approved" }

    it "does not call on_approve" do
      expect(job).to_not receive(:on_approve)
      subject
    end
  end
end
