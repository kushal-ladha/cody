# typed: false
FactoryBot.define do
  factory :setting do
    repository
    after(:build) do |setting|
      io = StringIO.new("", "w+")
      Transit::Writer.new(:json, io).write(setting.value)
      setting.value = io.string
    end
  end
end
