import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import api from 'utils/api';
import { handleFetchUserIdentityAsync } from 'actions/auth/actions';

export function* getUserIdentity() {
  try {
    const { data: response } = yield call(api.get, '/users.profile.get', {
      params: {
        token: process.env.TEST_TOKEN,
      },
    });

    const { display_name: name, email } = response.profile;

    yield put(handleFetchUserIdentityAsync.success({
      name,
      email,
    }));
  } catch (error) {
    console.error(error);
  }
}

export default function* authSagas() {
  yield takeLatest(handleFetchUserIdentityAsync.request, getUserIdentity);
}
