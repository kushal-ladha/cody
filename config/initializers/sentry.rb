# typed: strict
Sentry.init do |config|
  config.dsn = ENV["RAVEN_DSN"]
end
