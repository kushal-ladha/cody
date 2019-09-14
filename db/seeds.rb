# typed: strict
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

PullRequest.create! repository: "aergonaut/testrepo", number: 12345, status: "pending_review"

ReviewRuleAlways.create! name: "Second Level Review", short_code: "second_level", reviewer: "123", repository: "aergonaut/testrepo"
