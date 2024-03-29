/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import SlackMessageText from 'components/slack/chat-head/message/message-text';
import SlackMessageFile from 'components/slack/chat-head/message/message-file';
import api from 'utils/api';

export type ownProps = {
  ts: number,
  channelId: string,
  replyCount: number,
}

const mapStateToProps = ({ auth, chat }: RootState, ownState: ownProps) => ({
  ...auth,
  users: chat.users,
  ...ownState,
});

export type SlackMessageThreadProps = ReturnType<typeof mapStateToProps>

const SlackMessageThread = ({
  users, token, ts, channelId, replyCount,
}: SlackMessageThreadProps) => {
  const [thread, setThread] = useState({
    fetching: false,
    list: [],
  });

  const fetchThread = async () => {
    try {
      setThread({
        fetching: true,
        list: [],
      });

      const { data } = await api.get('https://slack.com/api/conversations.replies', {
        params: {
          token,
          channel: channelId,
          ts,
        },
      });

      setThread({
        fetching: false,
        list: data.messages,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    fetchThread();
  }, [replyCount, open]);

  type threadMessage = {
    client_msg_id: string,
    user: string,
    text: string,
    ts: number,
    files: [],
  }

  const renderThreadMessage = (threadMessage: threadMessage) => {
    const {
      client_msg_id, user, text, ts: tmTs, files,
    } = threadMessage;
    let profile: any = {};
    const timestamp = new Date(tmTs * 1000).toLocaleString();

    if (users[user]) {
      profile = users[user];
    }

    return (
      <li key={client_msg_id} title={`Sent: ${timestamp}`}>
        <small>{profile.real_name}</small>
        <br />
        <SlackMessageText text={text} />
        {files && files.map((f) => <SlackMessageFile file={f} />)}
      </li>
    );
  };

  const renderThread = (
    <ul className="chat__head__thread__list">
      {thread.fetching && <p>fetching...</p>}
      {thread.list
        .slice(1) // remove the first value as it is the parent message
        .map((thrdMsg) => renderThreadMessage(thrdMsg))}
      <button title="Close thread" type="button" onClick={() => setOpen(false)}>Close Thread</button>
    </ul>
  );

  const title = `${replyCount} ${replyCount > 1 ? 'replies' : 'reply'}`;

  return (
    <div className="chat__head__thread">
      {open ? renderThread : <button type="button" onClick={() => setOpen(true)} title="View thread">{title}</button>}
    </div>
  );
};

export default connect(mapStateToProps)(SlackMessageThread);
