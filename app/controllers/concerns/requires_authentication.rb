# typed: false
# frozen_string_literal: true

module RequiresAuthentication
  extend ActiveSupport::Concern

  def require_authentication!
    unless current_user.present?
      session[:return_to] = request.url
      flash[:info] = I18n.t("sessions.must_sign_in")
      redirect_to new_session_path
    end
  end

  def current_user
    if session[:user_id].present?
      user = User.find_by(id: session[:user_id])
      if user.present?
        Current.user = user
      else
        session[:user_id] = nil
        Current.user = nil
      end
    end
  end
end
