import { createReducer } from 'typesafe-actions';
import {
  handleFetchChannelsAsync, handleFetchMessagesAsync,
  ChatProps, handleSendMessageAsync, handleFetchMasterListAsync,
} from 'actions/chat/actions';
import * as chatTypes from 'actions/chat/types';

const INITIAL_STATE: ChatProps = {
  channels: {
    list: {},
    fetching: false,
  },
  masterList: [],
  users: {},
  activeChannel: [],
  activeThread: [],
};

const fetchChannelHandler = createReducer(INITIAL_STATE)
  .handleAction(handleFetchChannelsAsync.request,
    (state) => ({
      ...state,
      channels: {
        ...state.channels,
        list: {},
        fetching: true,
      },
    }))
  .handleAction(handleFetchChannelsAsync.success,
    (state, { payload }) => ({
      ...state,
      channels: {
        ...state.channels,
        list: payload,
        fetching: false,
      },
    }))
  .handleAction(handleFetchChannelsAsync.failure,
    (state) => ({
      ...state,
      channels: {
        ...state.channels,
        list: {},
        fetching: false,
      },
    }));

const fetchMasterListHandler = createReducer(INITIAL_STATE)
  .handleAction(handleFetchMasterListAsync.request,
    (state) => ({
      ...state,
      masterList: [],
    }))
  .handleAction(handleFetchMasterListAsync.success,
    (state, { payload }) => ({
      ...state,
      masterList: payload,
    }))
  .handleAction(handleFetchMasterListAsync.failure,
    (state) => ({
      ...state,
      masterList: [],
    }));

const fetchMessagesHandler = createReducer(INITIAL_STATE)
  .handleAction(handleFetchMessagesAsync.request,
    (state) => state)
  .handleAction(handleFetchMessagesAsync.success,
    (state, { payload }) => ({
      ...state,
      channels: {
        ...state.channels,
        list: {
          ...state.channels.list,
          [payload.channelId]: {
            ...state.channels.list[payload.channelId],
            messages: payload.messages,
          },
        },
      },
    }))
  .handleAction(handleFetchMessagesAsync.failure,
    (state) => state);

const sendMessageHandler = createReducer(INITIAL_STATE)
  .handleAction(handleSendMessageAsync.request, (state) => state)
  .handleAction(handleSendMessageAsync.success, (state) => state)
  .handleAction(handleSendMessageAsync.failure, (state) => state);

export default createReducer(INITIAL_STATE, {
  ...fetchChannelHandler.handlers,
  ...fetchMessagesHandler.handlers,
  ...sendMessageHandler.handlers,
  ...fetchMasterListHandler.handlers,
}).handleType(chatTypes.PUSH_NEW_MESSAGE,
  (state, { payload }) => ({
    ...state,
    channels: {
      ...state.channels,
      list: {
        ...state.channels.list,
        [payload.channelId]: {
          ...state.channels.list[payload.channelId],
          messages: [
            payload.message,
            ...state.channels.list[payload.channelId].messages,
          ],
          hasNewMessage: true,
        },
      },
    },
  }))
  .handleType(chatTypes.SET_READ_MESSAGE,
    (state, { payload }) => ({
      ...state,
      channels: {
        ...state.channels,
        list: {
          ...state.channels.list,
          [payload]: {
            ...state.channels.list[payload],
            hasNewMessage: false,
          },
        },
      },
    }))
  .handleType(chatTypes.SET_OPENED_CHANNEL,
    (state, { payload }) => ({
      ...state,
      channels: {
        ...state.channels,
        list: {
          ...state.channels.list,
          [payload]: {
            ...state.channels.list[payload],
            isOpenedChannel: true,
            hasNewMessage: false,
          },
        },
      },
    }))
  .handleType(chatTypes.CLOSE_CHANNEL,
    (state, { payload }) => ({
      ...state,
      channels: {
        ...state.channels,
        list: {
          ...state.channels.list,
          [payload]: {
            ...state.channels.list[payload],
            isOpenedChannel: false,
            hasNewMessage: false,
          },
        },
      },
    }))
  .handleType(chatTypes.SET_USER_LIST,
    (state, { payload }) => ({
      ...state,
      users: payload,
    }))
  .handleType(chatTypes.SET_USER_PRESENCE,
    (state, { payload }) => ({
      ...state,
      channels: {
        ...state.channels,
        list: Object.values(state.channels.list).map((c) => (c.user.id === payload.userId
          ? {
            ...c,
            presence: payload.presence,
          }
          : c)),
      },
    }))
  .handleType(chatTypes.PUSH_THREAD_MESSAGE,
    (state, { payload }) => ({
      ...state,
      channels: {
        ...state.channels,
        list: {
          ...state.channels.list,
          [payload.channel]: {
            ...state.channels.list[payload.channel],
            messages: state.channels.list[payload.channel].messages.map((m) => {
              if (m.ts === payload.thread_ts) {
                return {
                  ...m,
                  reply_count: m.reply_count + 1,
                };
              }

              return m;
            }),
            hasNewMessage: true,
          },
        },
      },
    }))
  .handleType(chatTypes.PUSH_CHANNEL,
    (state, { payload }) => ({
      ...state,
      channels: {
        ...state.channels,
        list: {
          ...state.channels.list,
          [payload]: {
            ...state.channels.list[payload],
          },
        },
      },
    }));
