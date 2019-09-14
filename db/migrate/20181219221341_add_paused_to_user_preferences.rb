# typed: true
class AddPausedToUserPreferences < ActiveRecord::Migration[5.1]
  def change
    add_column :user_preferences, :paused, :boolean
  end
end
