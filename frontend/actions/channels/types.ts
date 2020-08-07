/**
 * Fetches channels of current user
 * This should be preloaded on first load.
 * There are three 4 types of channel: public, private, im, mpim
 */
export const FETCH_CHANNELS_REQUEST = 'FETCH_CHANNELS_REQUEST';
export const FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS';
export const FETCH_CHANNELS_FAILED = 'FETCH_CHANNELS_FAILED';

export const FETCH_ACTIVE_CHANNELS_REQUEST = 'FETCH_ACTIVE_CHANNELS_REQUEST';
export const FETCH_ACTIVE_CHANNELS_SUCCESS = 'FETCH_ACTIVE_CHANNELS_SUCCESS';
export const FETCH_ACTIVE_CHANNELS_FAILED = 'FETCH_ACTIVE_CHANNELS_FAILED';

export const SET_OPENED_CHANNEL = 'SET_OPENED_CHANNEL';
export const ADD_TO_ACTIVE_CHANNEL = 'ADD_TO_ACTIVE_CHANNEL';
export const CLOSE_CHANNEL = 'CLOSE_CHANNEL';

// fetches all messages of a channel
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED';

// pushes a message to a channel object
export const PUSH_MESSAGE = 'PUSH_MESSAGE';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
