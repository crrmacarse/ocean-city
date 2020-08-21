import { createReducer } from 'typesafe-actions';
import { handleFetchUserIdentityAsync, AuthProps } from 'actions/auth/actions';
import * as authTypes from 'actions/auth/types';

const INITIAL_STATE: AuthProps = {
  authenticated: false,
  authId: '',
  token: '',
  user: {
    email: '',
    name: '',
    avatar: '',
    fetching: false,
  },
};

const fetchUserIdentityHandler = createReducer(INITIAL_STATE)
  .handleAction(handleFetchUserIdentityAsync.request,
    (state) => ({
      ...state,
      user: {
        ...state.user,
        email: '',
        name: '',
        avatar: '',
        fetching: true,
      },
    }))
  .handleAction(handleFetchUserIdentityAsync.success,
    (state, { payload }) => ({
      ...state,
      user: {
        ...state.user,
        ...payload,
        fetching: false,
      },
    }))
  .handleAction(handleFetchUserIdentityAsync.failure,
    (state) => ({
      ...state,
      user: {
        ...state.user,
        email: '',
        name: '',
        avatar: '',
        fetching: false,
      },
    }));

export default createReducer(INITIAL_STATE, {
  ...fetchUserIdentityHandler.handlers,
})
  .handleType(authTypes.SET_TOKEN,
    (state, { payload }) => ({
      ...state,
      authenticated: true,
      authId: payload.authId,
      token: payload.token,
    }));
