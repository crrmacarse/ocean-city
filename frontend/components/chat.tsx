import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as channelActions from 'actions/channels/actions';
import ChatWrapper from 'components/chat-wrapper';
import truncate from 'lodash/truncate';

export interface ownProps {
  channelId: string,
  channelName: string,
  messages: { text: string }[],
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
  closeChannel,
}: ChatProps) => {
  const [open, setOpen] = useState(false);

  const renderChatHead = (
    <ul className="chat__head">
      {messages.reverse().map((m, i) => (<li key={i}>{m.text}</li>))}
    </ul>
  );

  const handleOpen = () => {
    if (open) {
      setOpen(false);
    } else { setOpen(true); }
  };

  const handleClose = () => {
    closeChannel(channelId);
    setOpen(false);
  };

  return (
    <ChatWrapper>
      {open && renderChatHead}
      <div
        className="chat"
      >
        <img src="/assets/logo.png" alt="avatar" />
        <button type="button" onClick={handleOpen}>{truncate(channelName, { length: 25 })}</button>
        <button type="button" onClick={handleClose}>X</button>
      </div>
    </ChatWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
