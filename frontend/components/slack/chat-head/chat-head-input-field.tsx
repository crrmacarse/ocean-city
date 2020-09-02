import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { MentionsInput, Mention } from 'react-mentions';
import * as chatActions from 'actions/chat/actions';

export interface ownProps {
  channelId: string,
}

const mapStateToProps = ({ auth, chat }: RootState, ownState: ownProps) => ({
  ...auth,
  ...chat,
  ...ownState,
});

const mapDispatchToProps = { ...chatActions };

export type SlackChatHeadInputFieldProps = ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const SlackChatHeadInputField = ({
  token,
  users,
  channelId,
  sendMessage,
}: SlackChatHeadInputFieldProps) => {
  const [value, setValue] = useState('');

  const handleSendMessage = () => {
    sendMessage(token, channelId, value);
    setValue('');
  };

  // eslint-disable-next-line consistent-return
  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSendMessage();

      // https://stackoverflow.com/questions/31245808/clear-textarea-input-after-enter-key-press
      if (e.preventDefault) e.preventDefault();
      return false;
    }
  };

  return (
    <div className="chat__head__input">
      <MentionsInput
        className="chat__head__input--mentions"
        value={value}
        type="text"
        placeholder="Aa"
        allowSpaceInQuery
        onChange={(v, newValue) => setValue(newValue)}
        onKeyDown={handleOnKeyDown}
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

export default connect(mapStateToProps, mapDispatchToProps)(SlackChatHeadInputField);
