import { action, createAsyncAction } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import * as TYPES from './types';

export type channelType = {
  id: string,
  name: string,
}

// add current active channel
export type ChannelProps = DeepReadonly<{
  channels: {
    list: channelType[],
    fetching: boolean,
  },
  openChannels: channelType[], // opened channels
  activeChannel: string, // opened chat head
}>

/** Open a channel */
export const setOpenChannel = (channel: channelType) => action(TYPES.SET_OPEN_CHANNEL, channel);

/** Close channel */
export const setCloseChannel = (channelId: string) => action(TYPES.SET_CLOSE_CHANNEL, channelId);

/** Set Active channel. The one that opens in popup */
export const setActiveChannel = (channelId: string) => action(TYPES.SET_ACTIVE_CHANNEL, channelId);

/**
 * Fetch all channels
 *
 * - This could be minimize to few only
 * - Could add a payload for search
 * */
export const fetchChannels = () => action(TYPES.FETCH_CHANNELS_REQUEST);

export const handleFetchChannelList = createAsyncAction(
  TYPES.FETCH_CHANNELS_REQUEST,
  TYPES.FETCH_CHANNELS_SUCCESS,
  TYPES.FETCH_CHANNELS_FAILED,
)<void, any, Error>();
