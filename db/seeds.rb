# typed: strict
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

installation = Installation.create!(github_id: 1234)
repo = installation.repositories.create!(owner: "aergonaut", name: "testrepo")
repo.pull_requests.create!(number: 1234, status: PullRequest::STATUS_PENDING_REVIEW)
