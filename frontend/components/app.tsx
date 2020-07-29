import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as channelActions from 'actions/channels/actions';
import Header from 'components/header';
import Authenticate from 'components/authenticate';
import Bottom from 'components/bottom';
import truncate from 'lodash/truncate';

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
      <Header>
        <Authenticate />
      </Header>
      <main className="main">
        <p>Read the README.MD in the root folder for more details</p>
        <ul>
          <li>Lorem Ipsum</li>
        </ul>
        <p>Setting up of backend authentication has been skipped. You could easily make one</p>
        <h3>Resources</h3>
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
