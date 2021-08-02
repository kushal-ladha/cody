class AverageReviewLoad
	attr_reader :login

	def initialize(login)
		@login = login
	end

	def run
		Reviewer
			.where(login: login)
			.where("created_at > :one_week_ago", one_week_ago: 1.week.ago)
			.group(:login).count
	end
end
