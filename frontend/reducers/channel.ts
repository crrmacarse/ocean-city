import { createReducer } from 'typesafe-actions';
import { handleFetchChannelList, ChannelProps } from 'actions/channels/actions';

const INITIAL_STATE: ChannelProps = {
  channels: {
    list: [],
    fetching: false,
  },
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
});
