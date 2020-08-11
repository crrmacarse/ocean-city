import { action, createAsyncAction } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import * as TYPES from './types';

export type AuthProps = DeepReadonly<{
  token: string,
  user: {
    name: string,
    email: string,
    avatar: string,
    fetching: boolean,
  },
}>

export const fetchUserIdentity = () => action(TYPES.FETCH_USER_IDENTITY_REQUEST);

export const handleFetchUserIdentityAsync = createAsyncAction(
  TYPES.FETCH_USER_IDENTITY_REQUEST,
  TYPES.FETCH_USER_IDENTITY_SUCCESS,
  TYPES.FETCH_USER_IDENTITY_FAILED,
)<void, any, Error>();
