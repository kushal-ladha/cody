# frozen_string_literal: true

class CommandInvocation < ApplicationRecord
  belongs_to :pull_request

  # @return [ActiveRecord::Relation] a Relation containing only `cody approve`
  def self.approvals
    where(command: "cody approve")
  end

  # @param login [String] the login to filter by
  # @return [ActiveRecord::Relation] a Relation of all invocations by that login
  def self.for_login(login)
    where(login: login)
  end

  # @param earliest [ActiveSupport::TimeWithZone] the point from which to
  #   to start returning invocations
  # @return [ActiveRecord::Relation]
  def self.since(earliest)
    where("command_invocations.created_at >= ?", earliest)
  end

  # Record an invocation of a command. This is a convenience method that wraps
  # creation of the record in an exception handler so that exceptions can still
  # be raised and reported, but do not cause the program to stop.
  def self.record_invocation(attributes)
    create!(attributes)
  rescue
    Sentry.capture_exception($ERROR_INFO)
  end
end
