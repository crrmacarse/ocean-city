import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { fetchChannels } from 'actions/channels/actions';
import Header from 'components/header';
import Authenticate from 'components/authenticate';
import Bottom from 'components/bottom';

const mapStateToProps = ({ channel }: RootState) => ({
  ...channel,
});

const mapDispatchToProps = {
  handleFetchChannels: fetchChannels,
};

export type AppProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App = ({
  // channels,
  handleFetchChannels,
}: AppProps) => {
  useEffect(() => {
    handleFetchChannels();
  }, []);

  return (
    <div>
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
          <button className="active__chat" type="button">Christian Ryan Macarse</button>
        </Bottom>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
