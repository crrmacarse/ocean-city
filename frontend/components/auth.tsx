import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as authActions from 'actions/auth/actions';

const mapStateToProps = ({ auth }: RootState) => ({
  ...auth,
});

const mapDispatchToProps = {
  ...authActions,
};

export type AuthProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Auth = ({
  fetchUserIdentity,
  user,
}: AuthProps) => {
  useEffect(() => {
    fetchUserIdentity();
  }, []);

  const { name } = user;

  return (
    <div className="channel__user__details">
      <div className="channel__user__details--info">
        <img src="/assets/logo.png" alt="avatar" />
        <p>{name}</p>
      </div>
      <div className="channel__user__details--actions">
        <div>N</div>
        <div>M</div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
