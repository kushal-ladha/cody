# typed: true
# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: Setting.lookup("default_from_address") || "from@example.com"
  layout "mailer"
  helper :application

  def default_url_options
    {
      host: ENV["CODY_HOST"]
    }
  end
end
