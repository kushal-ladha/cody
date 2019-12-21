# frozen_string_literal: true

class WebhooksController < ApplicationController
  protect_from_forgery with: :null_session

  def pull_request
    body = JSON.parse(request.body.read)

    if %w(opened synchronize closed).include?(body["action"])
      ReceivePullRequestEvent.perform_async(body)
    end

    head :accepted
  end

  def issue_comment
    body = JSON.parse(request.body.read)

    if body.key?("zen")
      head :ok
      return
    end

    ReceiveIssueCommentEvent.perform_async(body)
    head :accepted
  end

  # The entry point for webhooks from the GitHub app
  def integration
    body = JSON.parse(request.body.read)

    if body.key?("zen")
      head :ok
      return
    end

    request.body.rewind

    event = request.headers["X-GitHub-Event"]
    case event
    when "push"
      ref = body["ref"]
      unless ref == "refs/heads/master"
        head :ok
        return
      end

      ReceivePushEvent.perform_async(
        body["repository"]["full_name"],
        body.dig("installation", "id")
      )
    when "pull_request"
      if %w(opened synchronize closed).include?(body["action"])
        ReceivePullRequestEvent.perform_async(body)
      end
    when "issue_comment"
      ReceiveIssueCommentEvent.perform_async(body)
    when "installation"
      ReceiveInstallationRepositoriesEvent.perform_async(
        body["repositories"],
        body.dig("installation", "id")
      )
    when "installation_repositories"
      ReceiveInstallationRepositoriesEvent
        .perform_async(
          body["repositories_added"],
          body.dig("installation", "id")
        )
    end

    head :accepted
  end
end
