import {
  takeLatest,
  call,
  put,
  all,
} from 'redux-saga/effects';
import api from 'utils/api';
import {
  handleFetchChannelsAsync, handleFetchMessagesAsync,
  handleSendMessageAsync, setUserList, handleFetchThreadAsync, handleFetchMasterListAsync,
} from 'actions/channels/actions';

/**
 * @TODO: Re-design this approach
 */
const fetchUserPresences = async (token: string, userChannels: any) => {
  const userChannelPresencePromise = userChannels.channels.map(async (uc) => {
    const { data } = await api.get('https://slack.com/api/users.getPresence', {
      params: {
        token,
        user: uc.user,
      },
    });

    return {
      user: uc.user,
      presence: data.presence,
    };
  });

  const results = await Promise.all(userChannelPresencePromise);

  return results;
};

export function* getChannels({ payload }) {
  try {
    // fetch group types
    const { data: groupChannels } = yield call(api.get, '/users.conversations', {
      params: {
        token: payload.token,
        types: 'public_channel,private_channel,mpim',
        user: payload.authId,
      },
    });

    // fetch user types
    const { data: userChannels } = yield call(api.get, '/users.conversations', {
      params: {
        token: payload.token,
        types: 'im',
        user: payload.authId,
      },
    });

    const { data: userList } = yield call(api.get, '/users.list', {
      params: {
        token: payload.token,
        types: 'public_channel,private_channel,mpim,im',
      },
    });

    const userChannelPresence = yield fetchUserPresences(payload.token, userChannels);

    const users = userList.members.reduce((acc, curr) => {
      acc[curr.id] = {
        display: curr.real_name,
        ...curr,
      };

      return acc;
    }, {});

    /**
     * Format channel
     *
     * I could group this to minimize the re-render and just flatten
     * it if used as a whole
     */
    const channels: {} = {
      ...groupChannels.channels.reduce((acc, curr) => {
        acc[curr.id] = {
          ...curr,
          channelName: curr.name,
          isOpenedChannel: false,
          messages: [],
        };

        return acc;
      }, {}),
      ...userChannels.channels.reduce((acc, curr) => {
        let user = { real_name: '' };

        if (curr.is_im) {
          user = users[curr.user];
        }

        const [userPresence] = userChannelPresence.filter((ucp) => ucp.user === curr.user);

        acc[curr.id] = {
          ...curr,
          channelName: user.real_name || curr.name,
          isOpenedChannel: false,
          messages: [],
          user,
          presence: userPresence.presence,
        };

        return acc;
      }, {}),
    };

    yield all([
      put(handleFetchChannelsAsync.success(channels)),
      put(setUserList(users)),
    ]);
  } catch (error) {
    console.error(error);
  }
}

export function* getMessages({ payload: { token, channelId } }: any) {
  try {
    const { data: response } = yield call(api.get, '/conversations.history', {
      params: {
        token,
        channel: channelId,
      },
    });

    yield put(handleFetchMessagesAsync.success({ channelId, messages: response.messages }));
  } catch (error) {
    console.error(error);
  }
}

export function* sendMessage({ payload: { token, channelId, message } }: any) {
  try {
    yield call(api.get, '/chat.postMessage', {
      params: {
        token,
        channel: channelId,
        text: message,
        as_user: true,
      },
    });

    yield put(handleSendMessageAsync.success());
  } catch (error) {
    console.error(error);
  }
}

/**
 * Get user pressence
 *
 * https://api.slack.com/methods/users.getPresence
 */
export function* checkPresence({ payload }: any) {
  try {
    const { data } = yield call(api.get, 'https://slack.com/api/users.getPresence', {
      params: {
        token: payload.token,
        user: payload.userId,
      },
    });

    console.error(data);
  } catch (error) {
    console.error(error);
  }
}

export function* getThread({ payload }: any) {
  try {
    const { data } = yield call(api.get, 'https://slack.com/api/conversations.replies', {
      params: {
        token: payload.token,
        channel: payload.conversationId,
        ts: payload.timestamp,
      },
    });

    yield put(handleFetchThreadAsync.success(data.messages));
  } catch (error) {
    console.error(error);
  }
}

export function* getMasterList({ payload }) {
  try {
    const { data: response } = yield call(api.get, '/conversations.list', {
      params: {
        token: payload.token,
        types: 'public_channel,private_channel,mpim,im',
      },
    });

    yield put(handleFetchMasterListAsync.success(response.channels));
  } catch (error) {
    console.error(error);
  }
}

export default function* channelSagas() {
  yield takeLatest(handleFetchChannelsAsync.request, getChannels);
  yield takeLatest(handleFetchMessagesAsync.request, getMessages);
  yield takeLatest(handleSendMessageAsync.request, sendMessage);
  yield takeLatest(handleFetchMasterListAsync.request, getMasterList);
  yield takeLatest(handleFetchThreadAsync.request, getThread);
}
