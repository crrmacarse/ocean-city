import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as channelActions from 'actions/channels/actions';
import Header from 'components/header';
import Authenticate from 'components/authenticate';
import Bottom from 'components/bottom';
import truncate from 'lodash/truncate';
import Socket from './socket';

const mapStateToProps = ({ channel }: RootState) => ({
  ...channel,
});

const mapDispatchToProps = {
  ...channelActions,
};

export type AppProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App = ({
  channels: { list },
  fetchChannels,
  closeChannel,
}: AppProps) => {
  useEffect(() => { fetchChannels(); }, []);

  return (
    <Fragment>
      <Socket />
      <Header>
        <Authenticate />
      </Header>
      <main className="main">
        <h2>Notes</h2>
        <ul>
          <li>
            Setting up of backend authentication had been skipped.
            Test tokens is embeded in the config(No need to click on the Sign in with Slack button).
          </li>
          <li>
            Websocket connectivity could be checked by visiting the console. Currently working on
            structuring on how to handle message feeding
          </li>
        </ul>
        <small>Read the README.MD in the root folder for more details</small>
        <Bottom>
          {Object.values(list)
            .filter((activeChannel) => activeChannel.isOpenedChannel)
            .map((activeChannel) => (
              <button
                onClick={() => {
                  closeChannel(activeChannel.id);
                  console.error('messages:', activeChannel.messages);
                }}
                className="active__chat"
                type="button"
                key={activeChannel.id}
              >
                {truncate(activeChannel.channelName, { length: 50 })}
              </button>
            ))}
        </Bottom>
      </main>
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
