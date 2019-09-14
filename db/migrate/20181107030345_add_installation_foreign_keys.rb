# typed: true
class AddInstallationForeignKeys < ActiveRecord::Migration[5.1]
  def change
    add_foreign_key :repositories, :installations
    add_index :installations, :github_id, unique: true
  end
end
