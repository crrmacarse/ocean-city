import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import api from 'utils/api';
import {
  handleFetchChannelList,
} from 'actions/channels/actions';

export function* getChannels() {
  try {
    const { data: response } = yield call(api.get, '/users.conversations', {
      params: {
        token: process.env.TEST_TOKEN,
        types: 'public_channel,private_channel,mpim,im',
      },
    });

    yield put(handleFetchChannelList.success(response.channels));
  } catch (error) {
    console.error(error);
  }
}

export default function* channelSagas() {
  yield takeLatest(handleFetchChannelList.request, getChannels);
}
