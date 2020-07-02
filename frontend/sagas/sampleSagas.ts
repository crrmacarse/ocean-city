import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import api from 'utils/api';
import * as sampleTypes from 'actions/samples/types';
import { handleCommunicateWithBackend } from 'actions/samples/actions';

export function* incrementAsync() {
  yield put({ type: sampleTypes.INCREMENTED_VALUE });
}

export function* decrementValue() {
  yield put({ type: sampleTypes.DECREMENTED_VALUE });
}

export function* networkReqToBackend() {
  try {
    const response = yield call(api.get, '/');

    console.error(response);
    yield all([
      put(handleCommunicateWithBackend.success()),
      // put(notificationSuccess('Check the console log for the response')),
    ]);
  } catch (error) {
    yield all([
      put(handleCommunicateWithBackend.failure(error)),
      // put(notificationError(error)),
    ]);
  }
}

export default function* sampleSagas() {
  yield takeLatest(sampleTypes.INCREMENT_VALUE, incrementAsync);
  yield takeLatest(sampleTypes.DECREMENT_VALUE, decrementValue);
  yield takeLatest(handleCommunicateWithBackend.request, networkReqToBackend);
}
