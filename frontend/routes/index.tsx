import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from 'components/app';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route component={() => <h1>Missing</h1>} />
  </Switch>
);

export default Routes;
