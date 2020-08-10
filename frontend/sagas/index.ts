import { all } from 'redux-saga/effects';
import authSagas from './authSagas';
import channelSagas from './channelSagas';

export default function* rootSagas() {
  yield all([
    authSagas(),
    channelSagas(),
  ]);
}
