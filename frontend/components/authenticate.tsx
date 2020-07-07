import React from 'react';

// Login toggle here
// forward to /:code route to handle a token fetch
const Authenticate = () => (
  <a href={`https://slack.com/oauth/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=read,client`}>
    <img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" />
  </a>
);

export default Authenticate;
