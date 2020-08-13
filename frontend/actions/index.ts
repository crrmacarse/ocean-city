import { ActionType } from 'typesafe-actions';
import * as authActions from './auth/actions';
import * as channelActions from './channels/actions';

const actions = {
  auth: authActions,
  channel: channelActions,
};

export default actions;

export type RootAction = ActionType<typeof actions>;
