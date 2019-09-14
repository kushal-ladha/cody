# typed: false
module StubHelper
  def stub_settings(repo, settings)
    allow(repo).to receive(:read_setting).and_return(nil)
    settings.each do |key, val|
      allow(repo).to receive(:read_setting).with(key.to_s).and_return(val)
    end
  end
end

RSpec.configure do |config|
  config.include StubHelper
end
