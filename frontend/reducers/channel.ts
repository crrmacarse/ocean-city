import { createReducer } from 'typesafe-actions';
import { handleFetchChannelsAsync, ChannelProps } from 'actions/channels/actions';
// import * as channelTypes from 'actions/channels/types';

const INITIAL_STATE: ChannelProps = {
  channels: {
    list: [],
    fetching: false,
  },
  activeChannels: [],
};

const fetchChannelHandler = createReducer(INITIAL_STATE)
  .handleAction(handleFetchChannelsAsync.request,
    (state) => ({
      ...state,
      channels: {
        ...state.channels,
        list: [],
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
        list: [],
        fetching: false,
      },
    }));

export default createReducer(INITIAL_STATE, {
  ...fetchChannelHandler.handlers,
});
