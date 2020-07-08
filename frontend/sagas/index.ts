import { all } from 'redux-saga/effects';
import sampleSagas from './sampleSagas';
import channelSagas from './channelSagas';

export default function* rootSagas() {
  yield all([
    channelSagas(),
    sampleSagas(),
  ]);
}
