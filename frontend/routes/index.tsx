import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from 'components/app';
import AuthHandler from 'components/auth-handler';

export const PUBLIC_HOME = '/';
export const PUBLIC_SLACK_AUTH_HANDLER = '/slack/auth/redirect';

const Routes = () => (
  <Switch>
    <Route exact path={PUBLIC_HOME} component={App} />
    <Route path={PUBLIC_SLACK_AUTH_HANDLER} component={AuthHandler} />
    <Route component={() => <h1>Missing</h1>} />
  </Switch>
);

export default Routes;
