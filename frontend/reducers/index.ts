import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import authReducer from './auth';
import channelReducer from './channel';

const rootReducer = combineReducers({
  auth: authReducer,
  channel: channelReducer,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
