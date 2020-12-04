# typed: false
class AddTimezoneToUserPreferences < ActiveRecord::Migration[5.1]
  def change
    add_column :user_preferences, :timezone, :string
  end
end
