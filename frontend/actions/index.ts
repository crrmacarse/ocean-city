import { ActionType } from 'typesafe-actions';
import * as channelActions from './channels/actions';

const actions = {
  channel: channelActions,
};

export default actions;

export type RootAction = ActionType<typeof actions>;
