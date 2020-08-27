import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as channelActions from 'actions/channels/actions';
import * as authActions from 'actions/auth/actions';
import api from 'utils/api';

const SLACK_RTM_URL = 'https://slack.com/api/rtm.connect';

const mapStateToProps = ({ auth }: RootState) => ({
  ...auth,
});

const mapDispatchToProps = {
  ...channelActions,
  ...authActions,
};

export type SlackWebsocketProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const SlackWebsocket = ({
  connected,
  token,
  websocketConnect,
  pushMessage,
  pushThreadMessage,
}: SlackWebsocketProps) => {
  const [socket, setSocket] = useState({ url: '' });

  useEffect(() => {
    if (connected) {
      return;
    }

    const initializeSocket = async () => {
      try {
        const { data } = await api.get(SLACK_RTM_URL, {
          params: {
            token,
          },
        });

        setSocket(data);
      } catch (error) {
        console.error(error);
      }
    };

    initializeSocket();
  }, [connected]);

  useEffect(() => {
    if (!socket.url) { return; }

    const client = new WebSocket(socket.url);

    client.onopen = () => {
      console.error('WebSocket Client Connected');
    };

    client.onmessage = ({ data }) => {
      const BLOCKED_SUBTYPES = ['message_changed', 'message_deleted']; // @TODO
      const response = JSON.parse(data);

      // eslint-disable-next-line no-console
      console.log('slack api:', response);

      if (response.type === 'message' && !BLOCKED_SUBTYPES.includes(response.subtype)) {
        if (response.thread_ts) {
          // @BUG: When thread is initialize while chat window is opened. It doesn't
          // create a thread. message_replied subtype could be the ideal for this
          // as it could just be swapped at runtime
          pushThreadMessage(response);
        } else {
          pushMessage(response.channel, response);
        }
      }

      if (response.type === 'hello') {
        websocketConnect(true);
      }

      if (response.type === 'goodbye') {
        websocketConnect(false);
      }
    };

    client.onerror = (e) => {
      console.error('Websocket Connection Error:', e);

      websocketConnect(false);
    };
  }, [socket]);

  return <Fragment />;
};

export default connect(mapStateToProps, mapDispatchToProps)(SlackWebsocket);
