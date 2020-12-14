# typed: true
class CreateInstallations < ActiveRecord::Migration[5.1]
  def change
    create_table :installations do |t|
      t.integer :github_id, null: false
      t.string :account

      t.timestamps
    end

    change_table :repositories do |t|
      t.references :installation
    end
  end
end
