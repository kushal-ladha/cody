class AddMoreReviewerTimestamps < ActiveRecord::Migration[6.1]
  def change
    change_table :reviewers do |t|
      t.datetime :first_commented_at
      t.datetime :last_commented_at
      t.datetime :approved_at
    end
  end
end
