import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as channelActions from 'actions/channels/actions';
import Channels from 'components/channels';
import Bottom from 'components/bottom';
import Socket from './socket';

const mapStateToProps = ({ channel }: RootState) => ({
  ...channel,
});

const mapDispatchToProps = {
  ...channelActions,
};

export type AppProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App = ({
  fetchChannels,
}: AppProps) => {
  useEffect(() => { fetchChannels(); }, []);

  return (
    <Fragment>
      <Socket />
      <main className="main">
        <div className="main__right">
          <div>
            <h1>Slack Messenger Demo</h1>
            <p>This is only a demo that intends to showcase Slack API integration</p>
            <h2>Notes</h2>
            <ul>
              <li>
                Setting up of backend authentication had been skipped.
                Test tokens is embeded in the config(No need to click on
                the Sign in with Slack button).
              </li>
              <li>
                Websocket connectivity could be checked by visiting the console.
                Currently working on
                structuring on how to handle message feeding
              </li>
              <li>
                You could check the working functionality in the console log :)
              </li>
            </ul>
            <small>Read the README.MD in the root folder for more details</small>
          </div>
          <Bottom />
        </div>
        <Channels />
      </main>
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
