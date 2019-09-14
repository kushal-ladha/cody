# typed: false
# frozen_string_literal: true

class Reviewer < ApplicationRecord
  belongs_to :review_rule, required: false
  belongs_to :pull_request

  STATUS_PENDING_APPROVAL = "pending_approval".freeze
  STATUS_APPROVED = "approved".freeze

  before_validation :default_status

  scope :from_rule, -> { where.not(review_rule_id: nil) }
  scope :pending_review, -> { where(status: STATUS_PENDING_APPROVAL) }
  scope :completed_review, -> { where(status: STATUS_APPROVED) }

  has_paper_trail

  after_save :send_outbound_notifications, if: -> { saved_change_to_login? }

  def addendum
    <<~ADDENDUM
      ### #{self.name_with_code}

      - [#{self.status_to_check}] @#{self.login}
      #{self.context}
    ADDENDUM
  end

  def status_to_check
    case status
    when STATUS_APPROVED
      "x"
    else
      " "
    end
  end

  def name_with_code
    if self.review_rule.short_code.present?
      "#{self.review_rule.name} (#{self.review_rule.short_code})"
    else
      self.review_rule.name
    end
  end

  def approve!
    self.status = STATUS_APPROVED
    save!
  end

  def send_outbound_notifications
    if (user = User.find_by(login: self.login))
      send_slack_message(recipient: user)
    end
  end

  def send_slack_message(recipient:)
    return unless recipient.slack_identity

    text =
      <<~MESSAGE
        You were assigned a new code review. View the Pull Request below.
      MESSAGE

    pr_html_url = self.pull_request.html_url
    attachments = [
      {
        fallback: "View the Pull Request at #{pr_html_url}",
        title: self.pull_request.full_title,
        title_link: pr_html_url,
        fields: [
          {
            title: "Review Context",
            value: self.review_rule&.name || "Peer Review",
            short: true
          }
        ],
        actions: [
          {
            type: "button",
            text: "View Pull Request",
            url: pr_html_url
          }
        ]
      }
    ]

    SendSlackMessage.perform_async(recipient.id, text, attachments)
  end

  private

  def default_status
    self.status ||= STATUS_PENDING_APPROVAL
  end
end
