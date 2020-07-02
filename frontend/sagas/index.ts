import { all } from 'redux-saga/effects';
import sampleSagas from './sampleSagas';

export default function* rootSagas() {
  yield all([
    sampleSagas(),
  ]);
}
