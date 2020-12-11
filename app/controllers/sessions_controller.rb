# frozen_string_literal: true

require "octokit"

class SessionsController < ApplicationController
  def new
  end

  def create
    user = user_from_omniauth
    if user.present?
      session[:user_id] = user.id
      session[:access_token] = user.make_access_token
    else
      flash[:danger] = I18n.t("sessions.auth_failure")
    end
    destination = session[:return_to] || root_path
    session[:return_to] = nil
    redirect_to destination
  end

  def destroy
    session[:user_id] = nil
    session[:access_token] = nil
    flash[:success] = I18n.t("sessions.signed_out")
    redirect_to new_session_path
  end

  private

  def user_from_omniauth
    auth = request.env["omniauth.auth"]
    user = User.find_or_initialize_by(uid: auth.uid)
    user.login = auth.info.nickname
    user.email ||= auth.info.email
    user.name = auth.info.name
    user.access_key = auth.credentials.token
    user.save
    user
  end
end
