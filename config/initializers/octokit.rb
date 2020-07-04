stack = Faraday::RackBuilder.new { |builder|
  builder.response :logger, Rails.logger, headers: false do |logger|
    logger.filter(/(Authorization:\s*).*$/, '\1[REDACTED]')
  end
  builder.use Octokit::Middleware::FollowRedirects
  builder.use Octokit::Response::RaiseError
  builder.use Octokit::Response::FeedParser
  builder.use Faraday::HttpCache, store: Rails.cache, logger: Rails.logger, shared_cache: false, serializer: Marshal
  builder.adapter Faraday.default_adapter
}
Octokit.middleware = stack
