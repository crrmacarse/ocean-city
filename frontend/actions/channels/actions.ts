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
  ts: string, // timestamp. [PK],
  thread: [], // experimental
}

export type channelType = {
  [id: string]: {
    id: string,
    channelName: string,
    messages: messageType[],
    isOpenedChannel: boolean, // first load must all be false
    hasNewMessage: boolean,
    presence: 'active' | 'away',
  }
}

export type userType = {
  [id: string]: {
    id: string,
    name: string,
    display: string,
  }
}

export type ChannelProps = DeepReadonly<{
  channels: {
    list: channelType,
    fetching: boolean,
  },
  masterList: {}[],
  users: userType,
  activeChannel: {}[], // Resreved for restructure
  activeThread: {}[],
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
 * Set message as read
 *
 * @param channelId
 */
export const setReadMessage = (channelId: string) => action(
  TYPES.SET_READ_MESSAGE,
  channelId,
);

/**
 * Send a message to slack api using chat.postMessage
 *
 * @param message
 */
export const sendMessage = (token: string, channelId: string, message: string) => action(
  TYPES.SEND_MESSAGE_REQUEST,
  { token, channelId, message },
);

export const handleSendMessageAsync = createAsyncAction(
  TYPES.SEND_MESSAGE_REQUEST,
  TYPES.SEND_MESSAGE_SUCCESS,
  TYPES.SEND_MESSAGE_FAILED,
)<{ channelId: string, message: string }, void, Error>();

export const fetchChannels = (payload: { token: string, authId: string }) => action(
  TYPES.FETCH_CHANNELS_REQUEST,
  payload,
);

export const handleFetchChannelsAsync = createAsyncAction(
  TYPES.FETCH_CHANNELS_REQUEST,
  TYPES.FETCH_CHANNELS_SUCCESS,
  TYPES.FETCH_CHANNELS_FAILED,
)<void, any, Error>();

export const fetchMasterList = (payload: { token: string, authId: string }) => action(
  TYPES.FETCH_MASTER_LIST_REQUEST,
  payload,
);

export const handleFetchMasterListAsync = createAsyncAction(
  TYPES.FETCH_MASTER_LIST_REQUEST,
  TYPES.FETCH_MASTER_LIST_SUCCESS,
  TYPES.FETCH_MASTER_LIST_FAILED,
)<void, any, Error>();

/**
 * This is an initial load of messages
 *
 * @param channelId
 */
export const fetchMessages = (payload: { token: string, channelId: string }) => action(
  TYPES.FETCH_MESSAGES_REQUEST,
  payload,
);

export const handleFetchMessagesAsync = createAsyncAction(
  TYPES.FETCH_MESSAGES_REQUEST,
  TYPES.FETCH_MESSAGES_SUCCESS,
  TYPES.FETCH_MESSAGES_FAILED,
)<{ channelId: string }, any, Error>();

/**
 * Set user list to reducer
 *
 * @param list
 */
export const setUserList = (list: userType) => action(TYPES.SET_USER_LIST, list);

export const setPresence = (userId: string, presence: 'away' | 'active') => action(TYPES.SET_USER_PRESENCE, { userId, presence });

export type threadType = {
  token: string, conversationId: string, timestamp: string
};

export const fetchThread = (
  payload: threadType,
) => action(
  TYPES.FETCH_THREAD_REQUEST,
  payload,
);

export const handleFetchThreadAsync = createAsyncAction(
  TYPES.FETCH_THREAD_REQUEST,
  TYPES.FETCH_THREAD_SUCCESS,
  TYPES.FETCH_THREAD_FAILED,
)<threadType, any, Error>();

export const pushThreadMessage = (message: {}) => action(
  TYPES.PUSH_THREAD_MESSAGE,
  message,
);

export const pushChannel = (channelId: string) => action(
  TYPES.PUSH_CHANNEL,
  channelId,
);
