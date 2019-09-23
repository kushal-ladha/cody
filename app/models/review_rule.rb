# typed: true
# frozen_string_literal: true

class ReviewRule < ApplicationRecord
  extend T::Sig

  GENERATED_REVIEWERS_REGEX = /^\s*#*\s*Generated\s*Reviewers\s*$/

  belongs_to :repository, required: true

  validates :name, presence: true
  validates :reviewer, presence: true
  validates :short_code, presence: true, uniqueness: { scope: :repository_id }

  scope :active, -> { where(active: true) }

  include GithubApi

  attr_accessor :match_context

  sig { returns(String) }
  def reviewer_human_name
    if self.reviewer.match?(/^\d+$/)
      team = github_client.team(self.reviewer)
      "#{team.organization.login}/#{team.slug}"
    else
      self.reviewer
    end
  end

  # Apply this rule to the given Pull Request.
  #
  # If the rule was not previously applied and the rule matches the PR, a new
  # Reviewer record is created for the PR.
  #
  # @return [void]
  sig do
    params(pr: T.untyped, pull_request_hash: T::Hash[String, T.untyped]).void
  end
  def apply(pr, pull_request_hash)
    if !previously_applied?(pr) && matches?(pull_request_hash)
      add_reviewer(pr)
    end
  end

  # Determine if this rule matches the received Pull Request
  #
  # The #matches? method should generate a string of additional context that
  # will be appended to the Generated Reviewers addendum directly below the
  # name of the reviewer that was added. This should be a Markdown-formatted
  # String. Also note that the addendum is also formatted as Markdown. This
  # means that if you want to have a blank line between the reviewer's name and
  # the start of the context, your context should begin with a newline. By
  # default there is no blank line in order to enable the creation of nested
  # lists underneath the reviewer.
  #
  # @param pull_request_hash [Hash] Hash-like resource representing the PR
  # @return [Boolean] true if the rule matches, false otherwise
  def matches?(*)
    # by default nothing matches
    nil
  end

  # Add the reviewer according to the rule's configuration
  #
  # @param pull_request [PullRequest] the PullRequest object to add reviewers to
  # @return [String] the login of the reviewer that was added
  sig { params(pull_request: PullRequest).returns(T.nilable(String)) }
  def add_reviewer(pull_request)
    reviewer_to_add = choose_reviewer(pull_request)

    pull_request.reviewers.create!(
      login: reviewer_to_add,
      review_rule_id: self.id,
      context: self.match_context
    )

    pull_request.save!

    reviewer_to_add
  end

  # List the possible reviewers according to this rule's configuration
  #
  # @return [Array<String>] the list of possible reviewers for this rule
  sig { returns(T::Array[String]) }
  def possible_reviewers
    if self.reviewer.include?("/")
      org, team = self.reviewer.split("/", 2)
      access_token = integration_access_token(
        installation_id: self.repository.installation.github_id
      )
      context = { access_token: access_token }
      result = Graphql::Github.team_members(
        org: org,
        team: team,
        context: context
      )
      result.data.organization.team.members.nodes.map(&:login)
    elsif self.reviewer.match?(/^\d+$/)
      team_members = github_client.team_members(self.reviewer)
      team_members.map(&:login)
    else
      # it's just a single user
      Array(self.reviewer)
    end
  end

  sig { params(login: String).returns(T::Boolean) }
  def possible_reviewer?(login)
    possible_reviewers.include?(login)
  end

  # @return [Boolean] true if the rule was previously applied, false otherwise
  sig { params(pr: PullRequest).returns(T::Boolean) }
  def previously_applied?(pr)
    pr.reviewers.exists?(review_rule_id: self.id)
  end

  # Build and filter commit authors and paused reviewers from possible reviewers
  #
  # @param pull_request [PullRequest] the PullRequest object
  # @return [Array<String>] the list of filtered reviewers
  sig { params(pull_request: T.untyped).returns(T::Array[String]) }
  def filtered_reviewers(pull_request)
    possible_reviewers - (pull_request.commit_authors | User.paused_logins)
  end

  # @param pull_request [PullRequest] the PullRequest object
  # @return [String] the login of the reviewer that was chosen
  sig { params(pull_request: PullRequest).returns(T.nilable(String)) }
  def choose_reviewer(pull_request)
    all_possible_reviewers = possible_reviewers

    reviewer_to_add = filtered_reviewers(pull_request).shuffle.find do |r|
      !pull_request.pending_review_logins.include?(r)
    end

    if reviewer_to_add.nil?
      # If we failed to choose a reviewer, that means that all of the possible
      # reviewers were already on the list or were commit authors.
      # Priority for adding reviews:
      #    1. Any potential reviewer that is not a commit author or current
      #       reviewer
      #    2. Any potential reviewer that is not a current reviewer
      #    3. Any potential reviewer
      new_reviewers = all_possible_reviewers - filtered_reviewers(pull_request)
      reviewer_to_add = new_reviewers.shuffle.find do |r|
        !pull_request.pending_review_logins.include?(r)
      end

      reviewer_to_add ||= all_possible_reviewers.sample
    end

    reviewer_to_add
  end

  def self.apply(pr, pull_request_hash)
    repo = Repository.find_by_full_name(
      pull_request_hash["base"]["repo"]["full_name"]
    )
    rules = repo.review_rules.active
    return if rules.empty?

    rules.each do |rule|
      rule.apply(pr, pull_request_hash)
    end
  end
end
