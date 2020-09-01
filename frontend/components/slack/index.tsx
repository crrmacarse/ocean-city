import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as authActions from 'actions/auth/actions';
import SlackChannels from 'components/slack/channel/channel-list';
import Authenticate from 'components/slack/authenticate';

const mapStateToProps = ({ auth }: RootState) => ({
  ...auth,
});

const mapDispatchToProps = {
  ...authActions,
};

export type SlackProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Slack = ({
  authenticated,
  setToken,
}: SlackProps) => {
  useEffect(() => {
    const slackTok = sessionStorage.getItem('slack_tok');

    if (slackTok) {
      setToken(JSON.parse(slackTok));
    }
  });

  const renderNotes = (
    <div className="slack__notes">
      <h1>Slack Messenger Demo</h1>
      <p>This is only a demo that intends to showcase Slack API integration</p>
      <h2>Notes</h2>
      <ul>
        <li>
          Authentication doesn&apos;t retain the values upon refresh. I have skipped setting up
          a full scale backend where it should receive the token response of slack api(should
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
        <li>
          Message input accepts native emoji(Windows: Win key + . || Mac: Ctrl + CMD + Space)
        </li>
        <li>
          &quot;invalid_team_for_non_distributed_app&quot; error requires installation of
          slack app first to the organization.
        </li>
      </ul>
      <small>Read the README.MD in the root folder for more details</small>
    </div>
  );

  return (
    <main className="slack__container">
      {renderNotes}
      {authenticated ? <SlackChannels /> : <Authenticate />}
    </main>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Slack);
