# typed: true
# frozen_string_literal: true

class ConfigController < ApplicationController
  protect_from_forgery with: :null_session

  def schema
    render json: Config::SCHEMA
  end

  def validate
    input = JSON.parse(request.body.read)
    config = Config.new(input)
    if config.valid?
      head :ok
    else
      render json: config.errors, status: :unprocessable_entity
    end
  end
end
