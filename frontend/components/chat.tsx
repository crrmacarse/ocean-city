import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as channelActions from 'actions/channels/actions';
import ChatWrapper from 'components/chat-wrapper';
import ChatInput from 'components/chat-input';
import SlackMessageFile from 'components/slack/message-file';
import truncate from 'lodash/truncate';

export interface ownProps {
  channelId: string,
  channelName: string,
  messages: { text: string }[],
  hasNewMessage: boolean,
}

/**
 * @TODO
 * -we need to display user status bubbles
 * -in channels, we need to format the group messages to reflect
 * how they display in the official Slack app
 * -when tagging, will need to display user name in text box rather than user id.
 * -reduce the number of recents that are displayed.
 * -how would I start a convo with someone not on my recents list?
 */
const mapStateToProps = ({ channel, auth }: RootState, ownState: ownProps) => ({
  ...auth,
  ...channel,
  ...ownState,
});

const mapDispatchToProps = {
  ...channelActions,
};

export type ChatProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Chat = ({
  authId,
  users,
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

  type messageType = {
    ts: number,
    text: string,
    files: [],
  }

  const searchUserValue = (match: string, found: string) => {
    if (users[found]) {
      return `@${users[found].display}`;
    }

    return `@${found}`;
  };

  const formatText = (text: string) => {
    const regex = /<[@|!]([a-z\d_]+)>/ig;

    if (!regex.test(text)) { return text; }

    return text.replace(regex, searchUserValue);
  };

  const renderMessage = (user: string, message: messageType) => {
    let profile: any = {};
    const isCurrentUser = user === authId;
    const { text, files, ts } = message;
    const timestamp = new Date(ts * 1000).toLocaleString();

    if (!isCurrentUser && users[user]) {
      profile = users[user];
    }

    return (
      <li key={ts} title={`Sent: ${timestamp}`}>
        <small title={profile.real_name}>{profile.real_name}</small>
        <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
          {formatText(text)}
          {files && files.map((f) => <SlackMessageFile file={f} />)}
        </div>
      </li>
    );
  };

  const renderChatMaximized = (
    <div className="chat__head">
      <div className="chat__head__top">
        <button type="button" onClick={handleMaximizedClose} title={channelName}>{trimmedName}</button>
        <button type="button" onClick={handleClose}><img src="/assets/icons/close.png" alt="close" /></button>
      </div>
      <ul>
        {messages.map((m) => renderMessage(m.user, m))}
      </ul>
      <ChatInput channelId={channelId} />
    </div>
  );

  const renderChatMinimized = (
    <div
      className={`chat ${hasNewMessage && !open && 'has__new__message'}`}
    >
      <div onClick={handleMinimizedOpen} onKeyDown={handleMinimizedOpen} role="presentation">
        <button type="button">{trimmedName}</button>
      </div>
      <button type="button" onClick={handleClose}><img src="/assets/icons/close.png" alt="close" /></button>
    </div>
  );

  return (
    <ChatWrapper>
      {open ? renderChatMaximized : renderChatMinimized}
    </ChatWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
