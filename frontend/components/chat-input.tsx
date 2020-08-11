import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as channelActions from 'actions/channels/actions';

export interface ownProps {
  channelId: string,
}

const mapStateToProps = (s, ownState: ownProps) => ({
  ...ownState,
});

const mapDispatchToProps = { ...channelActions };

export type InputProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Input = ({
  channelId,
  sendMessage,
}: InputProps) => {
  const [value, setValue] = useState('');

  const handleSendMessage = () => {
    sendMessage(channelId, value);
    setValue('');
  };

  return (
    <div className="chat__input">
      <input
        value={value}
        type="text"
        placeholder="Aa"
        onChange={(v) => setValue(v.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleSendMessage();
          }
        }}
      />
      <button type="submit" onClick={handleSendMessage}><img src="/assets/icons/send.png" alt="send" /></button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
