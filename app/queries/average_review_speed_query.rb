# frozen_string_literal: true

class AverageReviewSpeedQuery
  attr_accessor :login
  attr_accessor :since

  AVG_EXPRESSION = "EXTRACT(epoch FROM command_invocations.created_at - pull_requests.created_at)"

  def initialize(login:, since:)
    @login = login
    @since = since
  end

  def run
    duration_in_seconds =
      CommandInvocation
        .joins(:pull_request)
        .for_login(login)
        .approvals
        .since(since)
        .average(AVG_EXPRESSION)
        .to_f

    (duration_in_seconds / ActiveSupport::Duration::SECONDS_PER_DAY).days
  end
end
