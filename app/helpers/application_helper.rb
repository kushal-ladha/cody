# typed: true
# frozen_string_literal: true

module ApplicationHelper
  def pull_request_url(pull_request)
    "https://github.com/#{pull_request.repository.full_name}/pull/#{pull_request.number}"
  end
end
