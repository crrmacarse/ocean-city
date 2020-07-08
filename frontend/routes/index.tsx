import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from 'components/app';
import Validate from 'components/validate';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/authorize/:code" component={Validate} />
    <Route component={() => <h1>Missing</h1>} />
  </Switch>
);

export default Routes;
