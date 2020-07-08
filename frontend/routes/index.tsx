import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from 'components/app';

const Routes = () => (
  <Switch>
    <Route path="/" component={App} />
    <Route path="/authorize/:code" component={App} />
    <Route component={() => <h1>Missing</h1>} />
  </Switch>
);

export default Routes;
