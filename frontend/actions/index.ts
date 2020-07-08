import { ActionType } from 'typesafe-actions';
import * as channelActions from './channels/actions';
import * as sampleActions from './samples/actions';

const actions = {
  channel: channelActions,
  sample: sampleActions,
};

export default actions;

export type RootAction = ActionType<typeof actions>;
