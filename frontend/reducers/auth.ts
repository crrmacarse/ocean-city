import { createReducer } from 'typesafe-actions';
import { handleFetchUserIdentityAsync, AuthProps } from 'actions/auth/actions';

const INITIAL_STATE: AuthProps = {
  token: '',
  user: {
    email: '',
    name: '',
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
        fetching: false,
      },
    }));

export default createReducer(INITIAL_STATE, {
  ...fetchUserIdentityHandler.handlers,
});
