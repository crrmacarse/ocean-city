import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import api from 'utils/api';
import { handleFetchUserIdentityAsync } from 'actions/auth/actions';

export function* getUserIdentity({ payload }: any) {
  try {
    const { data: response } = yield call(api.get, '/users.profile.get', {
      params: {
        token: payload,
      },
    });

    const { display_name: name, email, image_192: avatar } = response.profile;

    yield put(handleFetchUserIdentityAsync.success({
      name,
      email,
      avatar,
    }));
  } catch (error) {
    console.error(error);
  }
}

export default function* authSagas() {
  yield takeLatest(handleFetchUserIdentityAsync.request, getUserIdentity);
}
