# typed: true
# frozen_string_literal: true

require "octokit"

class SessionsController < ApplicationController
  def new
    redirect_to "/auth/github"
  end

  def create
    user = user_from_omniauth
    if user.present?
      flash[:success] = "You are signed in"
      session[:user_id] = user.id
      session[:access_token] = user.make_access_token
    else
      flash[:danger] = "You could not be authenticated"
    end
    destination = session[:return_to] || root_path
    redirect_to destination
  end

  def destroy
    session[:user_id] = nil
    session[:access_token] = nil
    flash[:success] = "You have been signed out"
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
