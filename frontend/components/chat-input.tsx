import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { MentionsInput, Mention } from 'react-mentions';
import * as channelActions from 'actions/channels/actions';

export interface ownProps {
  channelId: string,
}

const mapStateToProps = ({ auth, channel }: RootState, ownState: ownProps) => ({
  ...auth,
  ...channel,
  ...ownState,
});

const mapDispatchToProps = { ...channelActions };

export type InputProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Input = ({
  token,
  users,
  channelId,
  sendMessage,
}: InputProps) => {
  const [value, setValue] = useState('');

  const handleSendMessage = () => {
    sendMessage(token, channelId, value);
    setValue('');
  };

  return (
    <div className="chat__input">
      <MentionsInput
        value={value}
        type="text"
        placeholder="Aa"
        allowSpaceInQuery
        onChange={(v, newValue) => setValue(newValue)}
        // eslint-disable-next-line consistent-return
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleSendMessage();

            // https://stackoverflow.com/questions/31245808/clear-textarea-input-after-enter-key-press
            if (e.preventDefault) e.preventDefault();
            return false;
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
