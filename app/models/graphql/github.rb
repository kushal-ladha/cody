# frozen_string_literal: true

# require "graphql/client"
# require "graphql/client/http"

module Graphql
  module Github
    extend self

    TeamMembersQuery = <<~'GRAPHQL' # rubocop:disable Naming/ConstantName
      query($org: String!, $team: String!) {
        organization(login: $org) {
          team(slug: $team) {
            members(first: 100) {
              nodes {
                login
                status {
                  indicatesLimitedAvailability
                }
              }
            }
          }
        }
      }
    GRAPHQL
    def team_members(org:, team:, context:)
      client = Octokit::Client.new(access_token: context[:access_token])
      payload = {
        query: TeamMembersQuery,
        variables: {
          org: org,
          team: team
        }
      }
      client.post "/graphql", payload.to_json
    end

    # This code is preserved for posteriority until I can figure out a way to
    # make GraphQL::Client take up less memory by loading the schema.
    #
    # HTTP = ::GraphQL::Client::HTTP.new("https://api.github.com/graphql") do
    #   def headers(context)
    #     {
    #       "Authorization" => "Bearer #{context[:access_token]}"
    #     }
    #   end
    # end
    #
    # Schema = ::GraphQL::Client.load_schema(
    #   Oj.load_file(Rails.root.join("github_schema.json").to_s)
    # )
    #
    # Client = ::GraphQL::Client.new(schema: Schema, execute: HTTP)
    #
    # TeamMembersQuery = Client.parse <<~'GRAPHQL'
    #   query($org: String!, $team: String!) {
    #     organization(login: $org) {
    #       team(slug: $team) {
    #         members(first: 100) {
    #           nodes {
    #             login
    #             status {
    #               indicatesLimitedAvailability
    #             }
    #           }
    #         }
    #       }
    #     }
    #   }
    # GRAPHQL
    # def team_members(org:, team:, context: {})
    #   Client.query(
    #     TeamMembersQuery,
    #     variables: { org: org, team: team },
    #     context: context
    #   )
    # end
  end
end
