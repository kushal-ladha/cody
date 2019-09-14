# typed: true
class DropRepositoryFromPullRequests < ActiveRecord::Migration[5.1]
  def change
    remove_column :pull_requests, :repository, :string
  end
end
