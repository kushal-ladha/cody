# typed: false
class DropRepositoryFromReviewRules < ActiveRecord::Migration[5.1]
  def change
    remove_column :review_rules, :repository, :string
  end
end
