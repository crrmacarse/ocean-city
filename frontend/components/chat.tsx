import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as channelActions from 'actions/channels/actions';
import ChatWrapper from 'components/chat-wrapper';
import ChatInput from 'components/chat-input';
import truncate from 'lodash/truncate';

export interface ownProps {
  channelId: string,
  channelName: string,
  messages: { text: string }[],
  hasNewMessage: boolean,
}

const mapStateToProps = (s, ownState: ownProps) => ({
  ...ownState,
});

const mapDispatchToProps = {
  ...channelActions,
};

export type ChatProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Chat = ({
  channelId,
  channelName,
  messages,
  hasNewMessage,
  closeChannel,
  setReadMessage,
}: ChatProps) => {
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

  const renderChatMaximized = (
    <div className="chat__head">
      <div className="chat__head__top">
        <button type="button" onClick={handleMaximizedClose} title={channelName}>{trimmedName}</button>
        <button type="button" onClick={handleClose}>X</button>
      </div>
      <ul>
        {messages.map((m, i) => (
          <li
            className={m.user === process.env.TEST_CHANNEL_ID ? 'sent' : 'received'}
            key={i}
          >
            {m.text}
            {m.files && m.files.map((f) => (<a href={f.permalink}>{`File: ${f.title}`}</a>))}
          </li>
        ))}
      </ul>
      <ChatInput channelId={channelId} />
    </div>
  );

  const renderChatMinimized = (
    <div
      className={`chat ${hasNewMessage && !open && 'has__new__message'}`}
    >
      <div onClick={handleMinimizedOpen} onKeyDown={handleMinimizedOpen} role="presentation">
        <img src="/assets/logo.png" alt="avatar" />
        <button type="button">{trimmedName}</button>
      </div>
      <button type="button" onClick={handleClose}>X</button>
    </div>
  );

  return (
    <ChatWrapper>
      {open ? renderChatMaximized : renderChatMinimized}
    </ChatWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
