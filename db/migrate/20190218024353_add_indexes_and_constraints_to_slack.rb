# typed: false
class AddIndexesAndConstraintsToSlack < ActiveRecord::Migration[5.1]
  def change
    add_foreign_key :slack_identities, :slack_teams
    add_foreign_key :slack_identities, :users

    add_index :slack_identities, [:uid, :slack_team_id], unique: true
  end
end
