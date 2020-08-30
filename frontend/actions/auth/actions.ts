import { action, createAsyncAction } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import * as TYPES from './types';

export type AuthProps = DeepReadonly<{
  authenticated: boolean,
  connected: boolean,
  token: string,
  authId: string,
  user: {
    name: string,
    email: string,
    avatar: string,
    fetched: boolean,
  },
}>

/**
 * This sets the desired credentials of the currently logged user
 */
export const setToken = (payload: { token: string, authId: string }) => action(
  TYPES.SET_TOKEN,
  payload,
);

export const fetchUserIdentity = (token: string) => action(
  TYPES.FETCH_USER_IDENTITY_REQUEST,
  token,
);

export const handleFetchUserIdentityAsync = createAsyncAction(
  TYPES.FETCH_USER_IDENTITY_REQUEST,
  TYPES.FETCH_USER_IDENTITY_SUCCESS,
  TYPES.FETCH_USER_IDENTITY_FAILED,
)<void, any, Error>();

export const websocketConnect = (connected: boolean) => action(
  TYPES.WEBSOCKET_CONNECT,
  connected,
);
