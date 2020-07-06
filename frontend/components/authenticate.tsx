import React from 'react';

// Login toggle here
const Authenticate = () => (
  <a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=723178304679.1104307770342">
    <img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" />
  </a>
);

export default Authenticate;
