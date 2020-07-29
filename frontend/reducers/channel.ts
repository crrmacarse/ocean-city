import { createReducer } from 'typesafe-actions';
import { handleFetchChannelList, ChannelProps } from 'actions/channels/actions';
import * as channelTypes from 'actions/channels/types';

const INITIAL_STATE: ChannelProps = {
  channels: {
    list: [],
    fetching: false,
  },
  openChannels: [],
  activeChannel: null,
};

const fetchChannelHandler = createReducer(INITIAL_STATE)
  .handleAction(handleFetchChannelList.request,
    (state) => ({
      ...state,
      channels: {
        ...state.channels,
        list: [],
        fetching: true,
      },
    }))
  .handleAction(handleFetchChannelList.success,
    (state, { payload }) => ({
      ...state,
      channels: {
        ...state.channels,
        list: payload,
        fetching: false,
      },
    }))
  .handleAction(handleFetchChannelList.failure,
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
}).handleType(channelTypes.SET_ACTIVE_CHANNEL,
  (state, { payload }) => ({ ...state, activeChannel: payload }))
  .handleType(channelTypes.SET_OPEN_CHANNEL,
    (state, { payload }) => ({ ...state, openChannels: [...state.openChannels, payload] }))
  .handleType(channelTypes.SET_CLOSE_CHANNEL,
    (state, { payload }) => (
      { ...state, openChannels: state.openChannels.filter((oC) => oC.id === payload) }
    ));
