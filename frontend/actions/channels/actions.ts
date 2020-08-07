import { action, createAsyncAction } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import * as TYPES from './types';

/**
 * Definitions
 *
 * Channels - An overall list of channel
 * activeChannels - a list of active channel(Initiated channel)
 *
 */

export type messageType = {
  clientMessageId: string,
  text: string,
  user: string,
  team: string,
  timestamp: string,
}

export type channelType = {
  id: string,
  channelName: string,
  isOpenedChannel: boolean, // first load must all be false
  messages: messageType[],
}

export type ChannelProps = DeepReadonly<{
  channels: {
    list: channelType[],
    fetching: boolean,
  },
  activeChannels: string[],
}>

/**
 * To close an currentOpenedChannel
 *
 * @param channelId
 */
export const closeChannel = (channelId: string) => action(TYPES.CLOSE_CHANNEL, channelId);

/**
 * Set as as current opened channel. It sohuld run in activeChannels to search for the id then
 * set isCurrentOpenedChannel props to true
 *
 */
export const setOpenedChannel = (channelId: string) => action(TYPES.SET_OPENED_CHANNEL, channelId);

/**
 * Add to a roster of active channels
 */
export const addToActiveChannel = (channel: channelType) => action(
  TYPES.ADD_TO_ACTIVE_CHANNEL,
  channel,
);

/**
 * This is an initial load of messages
 *
 * @param channelId
 */
export const loadMessages = (channelId: string) => action(TYPES.FETCH_MESSAGES_REQUEST, channelId);

/**
 * Pushes a message to the channel object. This is what the websocket will utilize
 *
 * @param message
 * */
export const addMessage = (message: messageType) => action(TYPES.ADD_MESSAGE, message);

/**
 * Send a message to slack api using chat.postMessage
 *
 * @param message
 */
export const sendMEssage = (message: string) => action(TYPES.SEND_MESSAGE_REQUEST, message);

export const fetchChannels = () => action(TYPES.FETCH_CHANNELS_REQUEST);

export const handleFetchChannelsAsync = createAsyncAction(
  TYPES.FETCH_CHANNELS_REQUEST,
  TYPES.FETCH_CHANNELS_SUCCESS,
  TYPES.FETCH_CHANNELS_FAILED,
)<void, any, Error>();
