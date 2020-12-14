# typed: true
class CreateSlackTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :slack_teams do |t|
      t.string :team_id, null: false
      t.string :name, null: false
      t.string :encrypted_bot_access_token
      t.string :encrypted_bot_access_token_iv

      t.index :team_id, unique: true

      t.timestamps
    end
  end
end
