class MakeReviewerNotNull < ActiveRecord::Migration[6.0]
  def up
    change_column :review_rules, :name, :string, null: false
    change_column :review_rules, :reviewer, :string, null: false
  end

  def down
    change_column :review_rules, :name, :string, null: true
    change_column :review_rules, :reviewer, :string, null: true
  end
end
