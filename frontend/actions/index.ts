import { ActionType } from 'typesafe-actions';
import * as authActions from './auth/actions';
import * as chatActions from './chat/actions';

const actions = {
  auth: authActions,
  chat: chatActions,
};

export default actions;

export type RootAction = ActionType<typeof actions>;
