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
  openChannels,
  fetchChannels,
  setCloseChannel,
}: AppProps) => {
  useEffect(() => {
    fetchChannels();
  }, []);

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
          {openChannels.map((openChannel) => (
            <button onClick={setCloseChannel} className="active__chat" type="button" key={openChannel.id}>{truncate(openChannel.name, { length: 50 })}</button>
          ))}
        </Bottom>
      </main>
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
