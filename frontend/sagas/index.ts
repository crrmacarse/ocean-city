import { all } from 'redux-saga/effects';
import channelSagas from './channelSagas';

export default function* rootSagas() {
  yield all([
    channelSagas(),
  ]);
}
