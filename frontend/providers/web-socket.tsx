import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as channelActions from 'actions/channels/actions';
import api from 'utils/api';

const SLACK_RTM_URL = 'https://slack.com/api/rtm.connect';
const SLACK_TOKEN = process.env.TEST_TOKEN;

const mapDispatchToProps = {
  ...channelActions,
};

export type SocketComponent = typeof mapDispatchToProps;

const SocketComponent = ({
  pushMessage,
}: SocketComponent) => {
  const [socket, setSocket] = useState({ url: '' });

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        // @TODO: Could get the USER ID HERE
        const { data } = await api.get(SLACK_RTM_URL, {
          params: {
            token: SLACK_TOKEN,
          },
        });

        setSocket(data);
      } catch (error) {
        console.error(error);
      }
    };

    initializeSocket();
  }, []);

  useEffect(() => {
    if (!socket.url) { return; }

    const client = new WebSocket(socket.url);

    client.onopen = () => {
      console.error('WebSocket Client Connected');
    };

    client.onmessage = ({ data }) => {
      const response = JSON.parse(data);
      // eslint-disable-next-line no-console
      console.log('slack api:', response);

      if (response.type === 'message') {
        pushMessage(response.channel, response);
      }
    };
  }, [socket]);

  return <Fragment />;
};

export default connect(null, mapDispatchToProps)(SocketComponent);
