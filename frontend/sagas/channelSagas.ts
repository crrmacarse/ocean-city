import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import api from 'utils/api';
import {
  handleFetchChannelsAsync,
} from 'actions/channels/actions';

export function* getChannels() {
  try {
    // fetch group types
    const { data: groupChannels } = yield call(api.get, '/users.conversations', {
      params: {
        token: process.env.TEST_TOKEN,
        types: 'public_channel,private_channel',
        user: process.env.TEST_CHANNEL_ID,
      },
    });

    // fetch user types
    const { data: userChannels } = yield call(api.get, '/users.conversations', {
      params: {
        token: process.env.TEST_TOKEN,
        types: 'mpim,im',
        user: process.env.TEST_CHANNEL_ID,
      },
    });

    const { data: userList } = yield call(api.get, '/users.list', {
      params: {
        token: process.env.TEST_TOKEN,
        types: 'public_channel,private_channel,mpim,im',
      },
    });

    // format channel
    const channels: {} = {
      ...groupChannels.channels.reduce((acc, curr) => {
        acc[curr.id] = {
          ...curr,
          name: curr.name,
          isOpenedChannel: false,
          messages: [],
        };

        return acc;
      }, {}),
      ...userChannels.channels.reduce((acc, curr) => {
        let user = { name: '' };

        if (curr.is_im) {
          const [extractedUser] = userList.members.filter((u) => u.id === curr.user);

          user = extractedUser;
        }

        acc[curr.id] = {
          ...curr,
          channelName: user.name || curr.name,
          isOpenedChannel: false,
          messages: [],
          user,
        };

        return acc;
      }, {}),
    };

    yield put(handleFetchChannelsAsync.success(channels));
  } catch (error) {
    console.error(error);
  }
}

export default function* channelSagas() {
  yield takeLatest(handleFetchChannelsAsync.request, getChannels);
}
