# typed: false
class AddUniqueIndexOnShortCodeToReviewRules < ActiveRecord::Migration[5.1]
  def change
    add_index :review_rules, [:short_code, :repository_id], unique: true
  end
end
