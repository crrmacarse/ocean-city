import { all } from 'redux-saga/effects';
import authSagas from './authSagas';
import chatSagas from './chatSagas';

export default function* rootSagas() {
  yield all([
    authSagas(),
    chatSagas(),
  ]);
}
