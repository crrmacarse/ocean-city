import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import Channels from 'components/channels';
import Bottom from 'components/bottom';
import Authenticate from 'components/authenticate';

const mapStateToProps = ({ auth }: RootState) => ({
  ...auth,
});

export type AppProps = ReturnType<typeof mapStateToProps>;

const App = ({
  authenticated,
}: AppProps) => (
  <main className="main">
    <div className="main__right">
      <div>
        <h1>Slack Messenger Demo</h1>
        <p>This is only a demo that intends to showcase Slack API integration</p>
        <h2>Notes</h2>
        <ul>
          <li>
            Authentication doesn&apos;t retain the values upon refresh. I have skipped setting up a
            full scale backend where it should receive the token response of slack api(should
            be binded to the account requester) instead i&apos;ve just created a mock sign-in.
          </li>
          <li>
            Websocket connection is feeded through the console(starts with &quot;slack api:&quot;)
          </li>
          <li>
            Messages have no support for pagination yet
          </li>
          <li>
            Bot messages are filtered out
          </li>
        </ul>
        <small>Read the README.MD in the root folder for more details</small>
      </div>
      <Bottom />
    </div>
    {authenticated ? <Channels /> : <Authenticate />}
  </main>
);

export default connect(mapStateToProps)(App);
