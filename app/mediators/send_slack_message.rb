# typed: true
# frozen_string_literal: true

class SendSlackMessage
  include Sidekiq::Worker

  def perform(recipient_id, message, attachments = [])
    return unless (recipient = User.find(recipient_id))
    return unless recipient.slack_identity

    token = recipient.slack_identity.slack_team.bot_access_token
    client = Slack::Web::Client.new(token: token)

    if recipient.slack_identity.channel.blank?
      response = client.im_open(user: recipient.slack_identity.uid)
      recipient.slack_identity.channel = response.channel.id
      recipient.slack_identity.save!
    end

    channel = recipient.slack_identity.channel
    client.chat_postMessage(
      channel: channel,
      text: message,
      attachments: attachments
    )
  end
end
