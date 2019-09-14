# typed: true
# frozen_string_literal: true

class PullsController < ApplicationController
  include RequiresAuthentication

  before_action :require_authentication!

  def index; end
end
