# typed: false
class ChangeSettingsIndex < ActiveRecord::Migration[5.1]
  def change
    remove_index :settings, [:key, :value]
    add_index :settings, [:key, :repository_id], unique: true
  end
end
