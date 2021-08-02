class LastPrReviewers
	attr_reader :pull_request
	attr_reader :status
	attr_reader :review_rule_name
	attr_reader :repository_name

	def initialize(pull_request, status: PullRequest::STATUS_CLOSED)
		@pull_request = pull_request
		@status = status
	end

	def run
		PullRequest
			.where(repository_id: pull_request.repository_id)
			.where.not(number: pull_request.number)
			.where.not(status: status)
			.last&.reviewers&.map(&:login)
	end
end
