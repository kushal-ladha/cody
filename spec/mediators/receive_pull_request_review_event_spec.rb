require "rails_helper"

RSpec.describe ReceivePullRequestReviewEvent do
  let(:repo) { FactoryBot.create :repository }
  let(:pull_request) { FactoryBot.create :pull_request, repository: repo }
  let(:sender) { "aergonaut" }
  let(:reviewer) { sender }

  let(:payload) do
    json_fixture(
      "pull_request_review",
      repo: {name: repo.name, owner: repo.owner},
      pull_request: {number: pull_request.number},
      sender: sender,
      reviewer: reviewer,
      state: state,
      action: action
    )
  end

  let(:job) { ReceivePullRequestReviewEvent.new }

  subject { job.perform(payload) }

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
        let!(:subject_reviewer) { FactoryBot.create :reviewer, pull_request: pull_request, login: sender }

        it "changes the sender's review to approved" do
          expect { subject }.to change { subject_reviewer.reload.status }.from(Reviewer::STATUS_PENDING_APPROVAL).to(Reviewer::STATUS_APPROVED)
        end

        it "updates last_commented_at for the reviewer" do
          subject
          subject_reviewer.reload
          expect(subject_reviewer.last_commented_at).to be_within(1.second).of(Time.now.utc)
        end

        context "when first_commented_at is nil" do
          before do
            subject_reviewer.update(first_commented_at: nil)
          end

          it "sets first_commented_at" do
            subject
            subject_reviewer.reload
            expect(subject_reviewer.first_commented_at).to be_within(1.second).of(Time.now.utc)
          end
        end

        context "when first_commented_at is not nil" do
          before do
            subject_reviewer.update(first_commented_at: 2.weeks.ago)
          end

          it "does not change first_commented_at" do
            expect { subject }.to_not change { subject_reviewer.reload.first_commented_at }
          end
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

    let(:peer_reviewer) { FactoryBot.create :reviewer, pull_request: pull_request, review_rule_id: nil }
    let(:generated_reviewer) { FactoryBot.create :reviewer, pull_request: pull_request }

    context "and the dismissed review was a peer reviewer" do
      let(:reviewer) { peer_reviewer.login }

      it "destroys the reviewer record" do
        subject
        expect(Reviewer.find_by(id: peer_reviewer.id)).to be_nil
      end

      it "does not reassign the generated reviewer's review" do
        subject
        expect(WebMock).to have_requested(:post, %r{https?://api.github.com/repos/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+/pulls/\d+/requested_reviewers}).
          with { |req|
            body = JSON.parse(req.body)
            !body["reviewers"].include?(reviewer)
          }
      end
    end

    context "and the dismissed review was a generated reviewer" do
      let(:reviewer) { generated_reviewer.login }

      it "reassigns the generated reviewer's review" do
        subject
        expect(WebMock).to have_requested(:post, %r{https?://api.github.com/repos/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+/pulls/\d+/requested_reviewers}).
          with { |req|
            body = JSON.parse(req.body)
            body["reviewers"].include?(reviewer)
          }
      end
    end
  end
end
