# typed: false
# frozen_string_literal: true

require "graphql/client"
require "graphql/client/http"

module Graphql
  module Github
    extend self

    HTTP = ::GraphQL::Client::HTTP.new("https://api.github.com/graphql") do
      def headers(context)
        {
          "Authorization" => "Bearer #{context[:access_token]}"
        }
      end
    end

    Schema = ::GraphQL::Client.load_schema(
      Rails.root.join("github_schema.json").to_s
    )

    Client = ::GraphQL::Client.new(schema: Schema, execute: HTTP)

    TeamMembersQuery = Client.parse <<~'GRAPHQL'
      query($org: String!, $team: String!) {
        organization(login: $org) {
          team(slug: $team) {
            members(first: 100) {
              nodes {
                login
              }
            }
          }
        }
      }
    GRAPHQL
    def team_members(org:, team:, context: {})
      Client.query(
        TeamMembersQuery,
        variables: { org: org, team: team },
        context: context
      )
    end
  end
end
