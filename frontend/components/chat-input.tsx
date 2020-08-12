import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { MentionsInput, Mention } from 'react-mentions';
import * as channelActions from 'actions/channels/actions';

export interface ownProps {
  channelId: string,
}

const mapStateToProps = ({ channel }: RootState, ownState: ownProps) => ({
  ...channel,
  ...ownState,
});

const mapDispatchToProps = { ...channelActions };

export type InputProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Input = ({
  users,
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
      <MentionsInput
        value={value}
        type="text"
        singleLine
        placeholder="Aa"
        allowSpaceInQuery
        onChange={(v, newValue) => setValue(newValue)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleSendMessage();
          }
        }}
      >
        <Mention
          trigger="@"
          data={Object.values(users)}
          markup="<@__id__>"
        />
      </MentionsInput>
      <button type="submit" onClick={handleSendMessage}><img src="/assets/icons/send.png" alt="send" /></button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
