import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import channelReducer from './channel';
import sampleReducer from './sample';

const rootReducer = combineReducers({
  channel: channelReducer,
  sample: sampleReducer,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
