import { action, createAsyncAction } from 'typesafe-actions';
import * as TYPES from './types';

export const incrementValue = () => action(TYPES.INCREMENT_VALUE);

export const decrementValue = () => action(TYPES.DECREMENT_VALUE);

export const sendCommunicationToBackend = () => action(TYPES.COM_WITH_BACKEND_REQUEST);

export const handleCommunicateWithBackend = createAsyncAction(
  TYPES.COM_WITH_BACKEND_REQUEST,
  TYPES.COM_WITH_BACKEND_SUCCESS,
  TYPES.COM_WITH_BACKEND_FAILED,
)<void, void, Error>();
