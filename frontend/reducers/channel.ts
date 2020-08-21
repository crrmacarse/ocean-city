import { createReducer } from 'typesafe-actions';
import {
  handleFetchChannelsAsync, handleFetchMessagesAsync,
  ChannelProps, handleSendMessageAsync, handleFetchMasterListAsync,
} from 'actions/channels/actions';
import * as channelTypes from 'actions/channels/types';

const INITIAL_STATE: ChannelProps = {
  channels: {
    list: {},
    fetching: false,
  },
  masterList: [],
  users: {},
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
}).handleType(channelTypes.PUSH_MESSAGE,
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
  })).handleType(channelTypes.SET_READ_MESSAGE,
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
  .handleType(channelTypes.SET_OPENED_CHANNEL,
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
  .handleType(channelTypes.CLOSE_CHANNEL,
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
  .handleType(channelTypes.SET_USER_LIST,
    (state, { payload }) => ({
      ...state,
      users: payload,
    }))
  .handleType(channelTypes.PUSH_CHANNEL,
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
