# frozen_string_literal: true

class ReceiveIssueCommentEvent
  include Sidekiq::Worker
  include GithubApi
  DIRECTIVE_REGEX = /([A-Za-z0-9_-]+)=\s?@?([A-Za-z0-9_-]+)/

  def perform(payload)
    Sentry.configure_scope do |scope|
      scope.set_user(username: payload["sender"]["login"])
      scope.set_tags(
        event: "issue_comment",
        repo: payload["repository"]["full_name"]
      )

      do_perform(payload)
    end
  end

  def do_perform(payload)
    Current.reset

    @payload = payload

    if (installation_id = @payload.dig("installation", "id"))
      Current.installation_id = installation_id
    end

    # check for ignored labels
    @repository =
      Repository.find_by_full_name(@payload["repository"]["full_name"])

    labels = @payload["issue"]["labels"].map { |label| label["name"] }
    if @repository.ignore?(labels)
      Current.reset
      return
    end

    comment = @payload["comment"]["body"]

    record_comment_interaction

    PaperTrail.request(whodunnit: @payload["sender"]["login"]) do
      if comment_affirmative?(comment)
        approval_comment
      elsif comment_rebuild_reviews?(comment)
        rebuild_reviews
      elsif (directives = comment_replace?(comment))
        replace_reviewer(directives)
      elsif comment_replace_me?(comment)
        replace_me
      end
    end

    Current.reset
  end

  def record_comment_interaction
    pr = find_pull_request(@payload)
    return unless pr

    login = @payload["sender"]["login"]

    now = Time.now.utc
    reviewers_for_login = pr.reviewers.pending_review.where(login: login)
    reviewers_for_login.where(first_commented_at: nil).update(first_commented_at: now)
    reviewers_for_login.update(last_commented_at: now)
  end

  def approval_comment
    pr = find_pull_request(@payload)
    return unless pr

    # Do not process approval comments on child PRs
    return if pr.parent_pull_request.present?

    comment = @payload["comment"]["body"]
    return unless comment_affirmative?(comment)

    comment_author = @payload["sender"]["login"]
    reviewer = pr.reviewers.pending_review.find_by(login: comment_author)
    return unless reviewer.present?

    reviewer.approve!

    if pr.reviewers.pending_review.empty?
      pr.status = "approved"
      pr.save!
      pr.update_status
    end

    pr.assign_reviewers

    CommandInvocation.record_invocation(
      command: "cody approve",
      args: "",
      login: @payload["sender"]["login"],
      pull_request_id: pr.id
    )

    github_client.add_comment(
      @payload["repository"]["full_name"],
      @payload["issue"]["number"],
      "@#{comment_author} Approving a code review using a comment has been deprecated and will be removed in the future. Please [submit your review](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/reviewing-proposed-changes-in-a-pull-request#submitting-your-review) through the GitHub interface instead."
    )
  end

  def rebuild_reviews
    pull_request = github_client.pull_request(
      @payload["repository"]["full_name"],
      @payload["issue"]["number"]
    )

    CreateOrUpdatePullRequest.new.perform(pull_request)
  end

  # Checks if the given string can be taken as an affirmative review.
  #
  # Recognized approval phrases (all case insensitive):
  #
  # * "LGTM"
  # * ":+1:" # the GitHub thumbs-up emoji string
  # * "Looks good"
  # * "Looks good to me"
  #
  # comment - String to check
  #
  # Returns true if the comment is affirmative; false otherwise.
  def comment_affirmative?(comment)
    return true if comment == "cody approve"

    phrases = %w(
      lgtm
      looks\s+good(?:\s+to\s+me)?
      👍
      🆗
      🚀
      💯
    )

    # emojis need some extra processing so we handle them separately
    emojis = %w[
      \+1
      ok
      shipit
      rocket
      100
    ].map { |e| ":#{e}:" }

    affirmatives = (phrases + emojis).map { |a| "(^\\s*#{a}\\s*$)" }
    joined = affirmatives.join("|")

    !!(comment =~ /#{joined}/i)
  end

  def comment_rebuild_reviews?(comment)
    comment == "!rebuild-reviews" ||
      comment == "cody rebuild"
  end

  def comment_replace?(comment)
    return false unless comment.match?(/^cody\s+r(eplace)?\s+(?<directives>.*)$/)

    match_data = comment.match(/^cody\s+r(eplace)?\s+(?<directives>.*)$/)
    directives = match_data["directives"]
    return false unless directives.match?(DIRECTIVE_REGEX)
    directives
  end

  def comment_replace_me?(comment)
    comment.match?(/^cody\s+r(eplace)?\s+(me).*$/)
  end

  def replace_reviewer(directives)
    pr = find_pull_request(@payload)
    return false unless pr

    removed_reviewers = []
    directives.scan(DIRECTIVE_REGEX).each do |code, login|
      reviewer = pr.generated_reviewers
        .joins(:review_rule)
        .find_by(review_rules: {short_code: code})

      next unless reviewer.present?

      next unless reviewer.review_rule.possible_reviewer?(login)

      next if reviewer.login == login

      # store the login of the old reviewer
      removed_reviewers << reviewer.login

      # duplicate the old reviewer, destroy it, then update the login of the dup
      reviewer_dup = reviewer.dup
      reviewer.destroy!
      reviewer_dup.login = login
      reviewer_dup.review_rule = reviewer.review_rule
      reviewer_dup.pull_request = reviewer.pull_request
      reviewer_dup.save!
    end

    unless removed_reviewers.empty?
      github_client.delete_pull_request_review_request(
        pr.repository.full_name,
        pr.number,
        reviewers: removed_reviewers
      )
    end
    pr.reload
    pr.update_body
    pr.assign_reviewers

    CommandInvocation.record_invocation(
      command: "cody replace",
      args: directives,
      login: @payload["sender"]["login"],
      pull_request_id: pr.id
    )
  end

  def replace_me
    pr = find_pull_request(@payload)
    return false unless pr

    commenter = @payload["sender"]["login"]

    old_reviewers = pr.reviewers.where(
      login: commenter,
      status: Reviewer::STATUS_PENDING_APPROVAL
    )
    return unless old_reviewers.present?

    old_reviewers.each do |reviewer|
      reviewer.reassign
    end
    pr.reload
    pr.update_body
    pr.assign_reviewers
    github_client.delete_pull_request_review_request(
      pr.repository.full_name,
      pr.number,
      reviewers: [commenter]
    )
  end

  private

  def find_pull_request(payload)
    PullRequest.joins(:repository).pending_review.find_by(
      number: payload["issue"]["number"],
      repositories: {
        owner: payload["repository"]["owner"]["login"],
        name: payload["repository"]["name"]
      }
    )
  end
end
