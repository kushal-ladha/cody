# typed: false
# frozen_string_literal: true

class SlackController < ApplicationController
  protect_from_forgery with: :null_session

  include RequiresAuthentication

  before_action :require_authentication!, only: [:connect]

  def command
    unless SlackTeam.exists?(team_id: params[:team_id])
      message = {
        response_type: "ephemeral",
        text: t(".errors.not_installed")
      }

      Faraday.post(
        params[:response_url],
        JSON.generate(message),
        content_type: "application/json"
      )
      return
    end

    argv = params[:text].split(" ")
    case argv[0]
    when "login"
      login
    else
      unrecognized
    end
  end

  def connect
    unless params[:uid].present? && params[:team_id].present?
      @message = t(".something_has_gone_wrong")
      @sub_message = t(".try_again")
      render :connect
      return
    end

    unless (team = SlackTeam.find_by(team_id: params[:team_id]))
      @message = t(".not_installed")
      @sub_message = t(".please_install")
      render :connect
      return
    end

    if current_user.slack_identity.present?
      @message = t(".already_connected")
      @sub_message = t(".only_once")
      render :connect
      return
    end

    identity = current_user.build_slack_identity(
      uid: params[:uid],
      slack_team: team
    )
    if identity.valid?
      identity.save
      @message = t(".all_set")
      @sub_message = t(".identity_connected")
    else
      @message = t(".something_has_gone_wrong")
      @sub_message = t(".try_again")
    end
  end

  private

  def login
    button_url = Rails.application.routes.url_helpers.slack_connect_url(
      protocol: "https",
      host: ENV["CODY_HOST"],
      uid: params[:user_id],
      team_id: params[:team_id]
    )
    message = {
      reponse_type: "ephemeral",
      text: t(".login.prompt"),
      attachments: [
        {
          fallback: "Please login to Cody: #{button_url}",
          actions: [
            {
              type: "button",
              text: "Connect",
              url: button_url
            }
          ]
        }
      ]
    }

    Faraday.post(
      params[:response_url],
      JSON.generate(message),
      content_type: "application/json"
    )
  end

  def unrecognized
    message = {
      reponse_type: "ephemeral",
      text: t(".errors.unrecognized")
    }

    Faraday.post(
      params[:response_url],
      JSON.generate(message),
      content_type: "application/json"
    )
  end
end
