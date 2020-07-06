import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers';
import rootSagas from 'sagas';

/* eslint-disable no-underscore-dangle */
const initialState = window && (window as any).__PRELOADED_STATE__;
delete (window as any).__PRELOADED_STATE__;
/* eslint-enable */

const sagasMiddleware = createSagaMiddleware();

let composeEnhancers = compose;

const middleware: any[] = [sagasMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
  /* eslint-disable-next-line no-underscore-dangle */
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = (preloadState: any) => {
  const Store = createStore(
    rootReducer,
    preloadState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  sagasMiddleware.run(rootSagas);

  return Store;
};

const initialStore = store(initialState);

export default initialStore;
