import 'providers/message';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'raf/polyfill';
import 'scss/index.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Providers from 'providers';
import initialStore from 'providers/store';

const docRoot = document.getElementById('root');

const app = (
  <ReduxProvider store={initialStore}>
    <Providers />
  </ReduxProvider>
);

render(app, docRoot);

// serviceWorker.register();
