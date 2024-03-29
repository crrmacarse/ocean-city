/* eslint-disable camelcase */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as chatActions from 'actions/chat/actions';
import ChatWrapper from 'components/slack/chat-head/chat-head-wrapper';
import ChatInput from 'components/slack/chat-head/chat-head-input-field';
import SlackMessageText from 'components/slack/chat-head/message/message-text';
import SlackMessageFile from 'components/slack/chat-head/message/message-file';
import SlackMessageThread from 'components/slack/chat-head/message/message-thread';
import truncate from 'lodash/truncate';

export interface ownProps {
  channelId: string,
  channelName: string,
  messages: { text: string }[],
  hasNewMessage: boolean,
}

const mapStateToProps = ({ chat, auth }: RootState, ownState: ownProps) => ({
  ...auth,
  ...chat,
  ...ownState,
});

const mapDispatchToProps = {
  ...chatActions,
};

export type SlackChatHeadProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const SlackChatHead = ({
  authId,
  users,
  channelId,
  channelName,
  messages,
  hasNewMessage,
  closeChannel,
  setReadMessage,
}: SlackChatHeadProps) => {
  const [open, setOpen] = useState(true);
  const trimmedName = truncate(channelName, { length: 25 });

  const handleMinimizedOpen = () => {
    setReadMessage(channelId);
    setOpen(true);
  };

  const handleMaximizedClose = () => {
    setReadMessage(channelId);
    setOpen(false);
  };

  const handleClose = () => {
    closeChannel(channelId);
    setOpen(false);
  };

  type messageType = {
    ts: number,
    text: string,
    reply_count: number,
    files: [],
  }

  const renderMessage = (user: string, message: messageType, i) => {
    let profile: any = {};
    const isCurrentUser = user === authId;
    const {
      text, files, ts, reply_count,
    } = message;
    const timestamp = new Date(ts * 1000).toLocaleString();

    if (!isCurrentUser && users[user]) {
      profile = users[user];
    }

    return (
      <li key={i} title={`Sent: ${timestamp}`}>
        <small title={profile.real_name}>{profile.real_name}</small>
        <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
          <SlackMessageText text={text} />
          {files && files.map((f, fI) => <SlackMessageFile file={f} key={fI} />)}
          {reply_count && (
            <SlackMessageThread
              key={ts}
              channelId={channelId}
              replyCount={reply_count}
              ts={ts}
            />
          )}
        </div>
      </li>
    );
  };

  /**
   * Messages not to be rendered
   */
  const MESSAGE_SUBTYPE_FILTER = ['bot_message', 'message_replied'];

  const renderChatMaximized = (
    <div className="chat__head__maximized">
      <div className="chat__head__maximized__top">
        <button className="chat__head__maximized__top--title" type="button" onClick={handleMaximizedClose} title={channelName}>{trimmedName}</button>
        <button className="chat__head__maximized__top--close" type="button" onClick={handleClose}><img src="/assets/icons/close.png" alt="close" /></button>
      </div>
      <ul className="chat__head__maximized__list">
        {messages
          .filter((m) => !MESSAGE_SUBTYPE_FILTER.includes(m.subtype))
          .map((m, i) => renderMessage(m.user, m, i))}
      </ul>
      <ChatInput channelId={channelId} />
    </div>
  );

  const renderChatMinimized = (
    <div
      className={`chat__head__minimized ${hasNewMessage && !open && 'has__new__message'}`}
    >
      <button className="chat__head__minimized--title" onClick={handleMinimizedOpen} type="button">{trimmedName}</button>
      <button type="button" onClick={handleClose}><img src="/assets/icons/close.png" alt="close" /></button>
    </div>
  );

  return (
    <ChatWrapper>
      {open ? renderChatMaximized : renderChatMinimized}
    </ChatWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SlackChatHead);
