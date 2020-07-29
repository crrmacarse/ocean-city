import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import channelReducer from './channel';

const rootReducer = combineReducers({
  channel: channelReducer,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
