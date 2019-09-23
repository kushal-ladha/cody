class ConstrainSettingsColumns < ActiveRecord::Migration[6.0]
  def up
    change_column :settings, :key, :string, null: false
    change_column :settings, :value, :string, null: false
  end

  def down
    change_column :settings, :key, :string, null: true
    change_column :settings, :value, :string, null: true
  end
end
