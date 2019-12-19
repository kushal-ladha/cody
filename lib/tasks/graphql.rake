namespace :graphql do
  desc "Export the GraphQL schema"
  task schema: :environment do
    File.write(
      Rails.root.join("schema.graphql"),
      GraphQL::Schema::Printer.print_schema(CodySchema)
    )
  end

  desc "Run Relay compiler"
  task relay: :schema do
    sh "bin/yarn relay"
  end

  desc "Update the GitHub GraphQL schema"
  task :github do
    Dotenv.load
    client = Octokit::Client.new(access_token: ENV["CODY_GITHUB_ACCESS_TOKEN"])
    response = client.get("/graphql")
    File.write(
      Rails.root.join("github_schema.json"),
      JSON.dump(response.to_h)
    )
  end
end
