import { EmoteSet } from 'comfy.js';
import React, { useEffect, useState } from 'react';

function formatEmotes(text: string, emotes: EmoteSet | undefined) {
  let splitText = text.split('') as (string[] | React.ReactNode)[];
  for (const emoteId in emotes) {
    const e = emotes[emoteId];
    for (const mote of e) {
      if (typeof mote === 'string') {
        const emoteTokens = mote.split('-');
        const bloop = [parseInt(emoteTokens[0]), parseInt(emoteTokens[1])];
        const length = bloop[1] - bloop[0];
        const empty = new Array(length + 1).fill(undefined).map(function () {
          return '';
        });
        const emoteName = text.substr(bloop[0], length + 1);
        splitText = splitText
          .slice(0, bloop[0])
          .concat(empty)
          .concat(splitText.slice(bloop[1] + 1, splitText.length));
        const emoteSrc = `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/light/3.0`;
        splitText.splice(
          bloop[0],
          1,
          <img
            alt={emoteName}
            data-twitch-emote={emoteName}
            data-twitch-emote-id={emoteId}
            src={emoteSrc}
          />,
        );
      }
    }
  }
  return splitText;
}

type ChatRole = 'broadcaster' | 'founder' | 'mod' | 'subscriber' | 'vip';
type ChatStatus = 'highlighted' | 'customReward';

type ChatMessage = {
  id: string;
  sender: string;
  message: string;
  roles: ChatRole[];
  userColor?: string;
  statuses: ChatStatus[];
  firstMessage?: boolean;
  emotes: EmoteSet | undefined;
} & (
  | Record<string, never>
  | {
      replyingToSender: string;
      replyingToOriginalMessage: string;
    }
);

type ChatMessageProps = {
  chatMessage: ChatMessage;
};

function Message({ chatMessage }: ChatMessageProps) {
  const message = chatMessage.message;
  return (
    <li
      data-twitch-sender={chatMessage.sender}
      data-twitch-sender-roles={chatMessage.roles.join(' ')}
      data-twitch-message-status={chatMessage.statuses.join(' ')}
      data-twitch-sender-color={chatMessage.userColor}
      style={
        chatMessage.userColor
          ? {
              '--twitch-sender-color': chatMessage.userColor,
            }
          : {}
      }
      data-twitch-sender-first-message={chatMessage.firstMessage}
    >
      {chatMessage.replyingToSender && (
        <small data-twitch-message-reply>
          <span className="twitch-chat-replying-to">
            Replying to @{chatMessage.replyingToSender}
          </span>
          <span className="twitch-chat-original-message">
            {chatMessage.replyingToOriginalMessage}
          </span>
        </small>
      )}
      <div className="twitch-chat-sender">{chatMessage.sender}</div>
      <div className="twitch-chat-message">
        {formatEmotes(message, chatMessage.emotes).map((n) => n)}
      </div>
    </li>
  );
}
export default function Chat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    window.ComfyJS.onChat = (user, message, flags, _, extra) => {
      const chatMessage: ChatMessage = {
        id: extra.id,
        message,
        sender: user,
        replyingToOriginalMessage: extra.userState['reply-parent-display-name'],
        replyingToSender: extra.userState['reply-parent-display-name'],
        roles: [],
        statuses: [],
        emotes: extra.messageEmotes,
        userColor: extra.userColor,
        firstMessage: extra.userState['first-msg'],
      };
      if (flags.broadcaster) chatMessage.roles.push('broadcaster');
      if (flags.founder) chatMessage.roles.push('founder');
      if (flags.mod) chatMessage.roles.push('mod');
      if (flags.subscriber) chatMessage.roles.push('subscriber');
      if (flags.vip) chatMessage.roles.push('vip');

      if (flags.highlighted) chatMessage.statuses.push('highlighted');
      if (flags.customReward) chatMessage.statuses.push('customReward');
      setChatMessages((chatMessages) => [...chatMessages, chatMessage]);
    };

    window.ComfyJS.Init('genericmikechen');
    return () => {
      window.ComfyJS.Disconnect();
    };
  }, []);

  return (
    <section className="chat scroll-container">
      <ul data-twitch-chat="genericmikechen">
        {chatMessages.map((chatMessage) => (
          <Message chatMessage={chatMessage} key={chatMessage.id} />
        ))}
      </ul>
    </section>
  );
}
