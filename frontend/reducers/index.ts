import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import authReducer from './auth';
import chatReducer from './chat';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
