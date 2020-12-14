# typed: true
class CreateUserPreferences < ActiveRecord::Migration[5.1]
  def change
    create_table :user_preferences do |t|
      t.references :user, foreign_key: true
      t.boolean :send_new_reviews_summary
    end
  end
end
