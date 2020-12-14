# typed: false
class AssignedReviewsQuery
  attr_reader :login
  attr_reader :status
  attr_reader :review_rule_name
  attr_reader :repository_name

  def self.run(**kwargs)
    new(**kwargs).run
  end

  def initialize(login:, status: nil, review_rule_name: nil, repository_name: nil)
    @login = login
    @status = status
    @review_rule_name = review_rule_name
    @repository_name = repository_name
  end

  def run
    relation =
      Reviewer
        .includes(:review_rule, :pull_request, pull_request: :repository)
        .where(login: login)
        .where(pull_requests: {status: [PullRequest::STATUS_PENDING_REVIEW]})
        .order(created_at: :desc)

    relation
      .then(&method(:status_clause))
      .then(&method(:review_rule_clause))
      .then(&method(:repository_clause))
  end

  private

  def status_clause(relation)
    if status.present?
      relation.where(status: status)
    else
      relation
    end
  end

  def review_rule_clause(relation)
    if review_rule_name.present?
      if review_rule_name == "none"
        relation.where(review_rule_id: nil)
      else
        relation.where(review_rules: {name: review_rule_name})
      end
    else
      relation
    end
  end

  def repository_clause(relation)
    if repository_name.present?
      owner, name = repository_name.split("/", 2)
      relation.joins(pull_request: :repository).where(pull_requests: {repositories: {owner: owner, name: name}})
    else
      relation
    end
  end
end
