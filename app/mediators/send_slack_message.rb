# typed: true
# frozen_string_literal: true

class SendSlackMessage
  include Sidekiq::Worker

  def perform(recipient_id, message, attachments = [])
    recipient = User.find(recipient_id)
    return unless (slack_identity = recipient.slack_identity)

    token = slack_identity.slack_team.bot_access_token
    client = Slack::Web::Client.new(token: token)

    if slack_identity.channel.blank?
      response = client.im_open(user: slack_identity.uid)
      slack_identity.channel = response.channel.id
      slack_identity.save!
    end

    channel = slack_identity.channel
    client.chat_postMessage(
      channel: channel,
      text: message,
      attachments: attachments
     )
  end
end
