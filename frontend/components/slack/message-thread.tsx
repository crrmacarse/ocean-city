/* eslint-disable camelcase */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import api from 'utils/api';

export type ownProps = {
  ts: number,
  channelId: string,
  replyCount: number,
}

const mapStateToProps = ({ auth, channel }: RootState, ownState: ownProps) => ({
  ...auth,
  users: channel.users,
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
  const [open, setOpen] = useState(false);

  type threadMessage = {
    client_msg_id: string,
    user: string,
    text: string,
    ts: number,
  }

  const renderThreadMessage = (threadMessage: threadMessage) => {
    const {
      client_msg_id, user, text, ts: tmTs,
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
        {text}
      </li>
    );
  };

  const renderThread = (
    <ul>
      {thread.fetching && <p>fetching...</p>}
      {thread.list
        .slice(1)
        .map((thrdMsg) => renderThreadMessage(thrdMsg))}
      <button title="Close thread" type="button" onClick={() => setOpen(false)}>Close Thread</button>
    </ul>
  );

  const handleOpenClick = async () => {
    try {
      setOpen(true);
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

  const title = `${replyCount} ${replyCount > 1 ? 'replies' : 'reply'}`;

  return (
    <div className="chat__thread__toggle">
      {open ? renderThread : <button type="button" onClick={handleOpenClick} title="View thread">{title}</button>}
    </div>
  );
};

export default connect(mapStateToProps)(SlackMessageThread);
