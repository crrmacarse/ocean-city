import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';
import WebSocket from './web-socket';

const Providers = () => (
  <Fragment>
    <WebSocket />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Fragment>
);

export default Providers;
