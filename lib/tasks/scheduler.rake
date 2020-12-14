# typed: false
namespace :scheduler do
  desc "Send the new reviews summary to each user"
  task send_new_reviews_summary: [:environment] do
    SummaryMailer.send_new_reviews_summary
  end
end
