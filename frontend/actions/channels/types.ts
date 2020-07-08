/**
 * Fetches channels of current user
 * This should be preloaded on first load.
 * There are three 4 types of channel: public, private, im, mpim
 */
export const FETCH_CHANNELS_REQUEST = 'FETCH_CHANNELS_REQUEST';
export const FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS';
export const FETCH_CHANNELS_FAILED = 'FETCH_CHANNELS_FAILED';

export const FETCH_CHANNEL_MESSAGES_REQUEST = 'FETCH_CHANNEL_MESSAGES_REQUEST';
export const FETCH_CHANNEL_MESSAGES_SUCCESS = 'FETCH_CHANNEL_MESSAGES_SUCCESS';
export const FETCH_CHANNEL_MESSAGES_FAILED = 'FETCH_CHANNEL_MESSAGES_FAILED';

export const SET_ACTIVE_CHANNEL = 'SET_ACTIVE_CHANNEL';
