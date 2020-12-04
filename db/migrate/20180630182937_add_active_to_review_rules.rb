# typed: false
class AddActiveToReviewRules < ActiveRecord::Migration[5.1]
  def change
    add_column :review_rules, :active, :boolean, default: true
  end
end
