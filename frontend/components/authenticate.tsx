import React from 'react';
// import { PUBLIC_SLACK_AUTH_HANDLER } from 'routes';

const PORT = process.env.PORT || 8080;
const URL = process.env.PUBLIC_URL || `http://localhost:${PORT}`;
const REDIRECT_URL = `${URL}/slack/auth/redirect`;

const Authenticate = () => (
  <a href={`https://slack.com/oauth/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=client read&redirect_uri=${REDIRECT_URL}`} style={{ margin: '1rem' }}>
    <img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" />
  </a>
);

export default Authenticate;
