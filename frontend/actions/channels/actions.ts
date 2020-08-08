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
  clientMsgId: string,
  text: string,
  channel: string,
  suppressNotification: string,
  ts: string, // timestamp
}

export type channelType = {
  id: string,
  channelName: string,
  isOpenedChannel: boolean, // first load must all be false
  messages: messageType[],
}

export type ChannelProps = DeepReadonly<{
  channels: {
    list: {},
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
 * Pushes a message to the channel object. This is what the websocket will utilize
 *
 * @param message
 * */
export const pushMessage = (channelId: string, message: messageType) => action(
  TYPES.PUSH_MESSAGE,
  { channelId, message },
);

/**
 * Send a message to slack api using chat.postMessage
 *
 * @param message
 */
export const sendMessage = (channelId: string, message: string) => action(
  TYPES.SEND_MESSAGE_REQUEST,
  { channelId, message },
);

export const handleSendMessageAsync = createAsyncAction(
  TYPES.SEND_MESSAGE_REQUEST,
  TYPES.SEND_MESSAGE_SUCCESS,
  TYPES.SEND_MESSAGE_FAILED,
)<{ channelId: string, message: string}, void, Error>();

export const fetchChannels = () => action(TYPES.FETCH_CHANNELS_REQUEST);

export const handleFetchChannelsAsync = createAsyncAction(
  TYPES.FETCH_CHANNELS_REQUEST,
  TYPES.FETCH_CHANNELS_SUCCESS,
  TYPES.FETCH_CHANNELS_FAILED,
)<void, any, Error>();

/**
 * This is an initial load of messages
 *
 * @param channelId
 */
export const fetchMessages = (channelId: string) => action(TYPES.FETCH_MESSAGES_REQUEST, channelId);

export const handleFetchMessagesAsync = createAsyncAction(
  TYPES.FETCH_MESSAGES_REQUEST,
  TYPES.FETCH_MESSAGES_SUCCESS,
  TYPES.FETCH_MESSAGES_FAILED,
)<{ channelId: string }, any, Error>();
