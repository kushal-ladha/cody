# typed: true
class AddSlackChannelToUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :slack_identities do |t|
      t.belongs_to :user
      t.belongs_to :slack_team
      t.string :uid, null: false
      t.string :channel

      t.timestamps
    end
  end
end
