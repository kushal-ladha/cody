# frozen_string_literal: true

class ReviewerList
  include Enumerable

  attr_reader :reviewers

  def initialize(reviewers:)
    @reviewers =
      reviewers.map { |reviewer|
        if reviewer.is_a?(String)
          NilStatusUser.new(login: reviewer)
        else
          reviewer
        end
      }
  end

  def each(&block)
    @reviewers
      .select { |reviewer| user_available?(reviewer) }
      .each(&block)
  end

  def choose_reviewer(pull_request, exclude_list: [])
    filtered_reviewers = each
                           .reject { |r| exclude_list.include?(r.login) }
    # Average the load from last 7 days. Irrespective of the whether it is already reviewed or pending
    reviewers_load = AverageReviewLoad.new(filtered_reviewers.map(&:login)).run

    reviewers_with_no_load = filtered_reviewers.map(&:login) - reviewers_load.keys
    reviewer = nil

    if reviewers_with_no_load.present?
      reviewer = reviewers_with_no_load.first
    else
      # Do not assign any reviewer from the last PR's reviewer list to avoid overburdening of any reviewer who was unavailable/leave in last 7 days.
      last_pr_reviewers = LastPrReviewers.new(pull_request).run
      reviewers_load.sort_by {|_key, value| value}.each do |login_count|
        reviewer = login_count[0]
        next if last_pr_reviewers&.include?(reviewer)
        break
      end
    end

    filtered_reviewers.find{|r| r.login == reviewer}
  end

  private

  def user_available?(user)
    if (status = user.status)
      if status.respond_to?(:indicates_limited_availability?)
        !status.indicates_limited_availability?
      else
        !status.indicatesLimitedAvailability
      end
    else
      true
    end
  end

  class NilStatusUser
    include Comparable

    attr_reader :login

    def initialize(login:)
      @login = login
    end

    def status
      nil
    end
  end
end
