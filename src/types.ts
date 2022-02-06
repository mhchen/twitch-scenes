import { ComfyJSInstance, OnMessageExtra, OnMessageFlags } from 'comfy.js';

type MonkeyPatchedOnMessageExtra = OnMessageExtra & {
  userState: {
    badges: {
      broadcaster?: string;
      premium?: string;
    };
    ['display-name']: string;
    ['first-msg']: boolean;
    id: string;
    ['message-type']: string;
    mod: boolean;
    ['reply-parent-display-name']: string;
    ['reply-parent-msg-body']: string;
    ['reply-parent-msg-id']: string;
    ['reply-parent-user-id']: string;
    ['reply-parent-user-login']: string;
    ['room-id']: string;
    subscriber: boolean;
    ['tmi-sent-ts']: string;
    turbo: boolean;
    ['user-id']: string;
    username: string;
  };
};

type OnChatHandlerWithMonkeyPatchedOnMessageExtra = {
  (
    user: string,
    message: string,
    flags: OnMessageFlags,
    self: boolean,
    extra: MonkeyPatchedOnMessageExtra,
  ): void;
};

export type MonkeyPatchedComfyJSInterface = Omit<ComfyJSInstance, 'onChat'> & {
  onChat: OnChatHandlerWithMonkeyPatchedOnMessageExtra;
};

export type ChannelProps = {
  title: string;
};
