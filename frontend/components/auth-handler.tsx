import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as authActions from 'actions/auth/actions';
import { useLocation, useHistory } from 'react-router-dom';
import { PUBLIC_HOME } from 'routes';
import api from 'utils/api';

const mapDispatchToProps = {
  ...authActions,
};

export type AuthHandlerProps = typeof mapDispatchToProps;

const AuthHandler = ({
  setToken,
}: AuthHandlerProps) => {
  const history = useHistory();
  const { search } = useLocation();

  /**
   * This is only a temporary approach. A proper implementation
   * requires a receiving backend to do this. Currently it exposes
   * the keys to the client on network request.
   */
  useEffect(() => {
    const getAuthToken = async () => {
      const query = new URLSearchParams(search);
      const code = query.get('code');

      try {
        const { data: response } = await api.get('https://slack.com/api/oauth.access', {
          params: {
            code,
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
          },
        });

        setToken({
          authId: response.user_id,
          token: response.access_token,
        });

        history.push(PUBLIC_HOME);
      } catch (error) {
        console.error(error);
      }
    };

    getAuthToken();
  }, [search]);

  return <Fragment />;
};

export default connect(null, mapDispatchToProps)(AuthHandler);
