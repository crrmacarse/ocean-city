import { action, createAsyncAction } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import * as TYPES from './types';

// add current active channel
export type ChannelProps = DeepReadonly<{
  channels: {
    list: {}[],
    fetching: boolean,
  },
  activeChannel: null,
}>

export const setActiveChannel = (channelId: string) => action(TYPES.SET_ACTIVE_CHANNEL, channelId);

export const fetchChannels = () => action(TYPES.FETCH_CHANNELS_REQUEST);

export const handleFetchChannelList = createAsyncAction(
  TYPES.FETCH_CHANNELS_REQUEST,
  TYPES.FETCH_CHANNELS_SUCCESS,
  TYPES.FETCH_CHANNELS_FAILED,
)<void, any, Error>();
