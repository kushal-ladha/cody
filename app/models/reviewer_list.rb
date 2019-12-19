# frozen_string_literal: true

class ReviewerList
  include Enumerable

  attr_reader :reviewers

  def initialize(reviewers:)
    @reviewers =
      reviewers.map do |reviewer|
        if reviewer.is_a?(String)
          NilStatusUser.new(login: reviewer)
        else
          reviewer
        end
      end
  end

  def each(&block)
    @reviewers
      .select { |reviewer| !reviewer.status&.indicatesLimitedAvailability }
      .each(&block)
  end

  def choose_reviewer(exclude_list: [])
    each
      .reject { |r| exclude_list.include?(r.login) }
      .sample
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
