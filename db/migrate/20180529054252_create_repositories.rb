# typed: false
class CreateRepositories < ActiveRecord::Migration[5.1]
  def change
    create_table :repositories do |t|
      t.string :name
      t.string :owner
      t.index [:name, :owner], unique: true
    end

    add_reference :pull_requests, :repository, foreign_key: true
    add_reference :review_rules, :repository, foreign_key: true
    add_reference :settings, :repository, foreign_key: true
  end
end
