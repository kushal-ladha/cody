# typed: true
# frozen_string_literal: true

class PullsController < ApplicationController
  include RequiresAuthentication

  before_action :require_authentication!
  before_action :set_sentry_context

  def index
  end

  private

  def set_sentry_context
    if current_user.present?
      Sentry.configure_scope do |scope|
        scope.set_user(
          id: current_user.id,
          username: current_user.login,
          email: current_user.email
        )
      end
    end
  end
end
