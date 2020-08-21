import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as authActions from 'actions/auth/actions';

export interface ownProps {
  handleSearch: any,
}

const mapStateToProps = ({ auth }: RootState, ownState: ownProps) => ({
  ...auth,
  ...ownState,
});

const mapDispatchToProps = {
  ...authActions,
};

export type ProfileProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Profile = ({
  fetchUserIdentity,
  token,
  user,
  handleSearch,
}: ProfileProps) => {
  useEffect(() => {
    fetchUserIdentity(token);
  }, []);

  const { name, avatar } = user;

  return (
    <div className="channel__user__details">
      <div className="channel__user__details--info">
        <img src={avatar} alt="avatar" />
        <p>{name}</p>
      </div>
      <div className="channel__user__details--actions" onClick={() => handleSearch()} onKeyDown={() => handleSearch()} role="presentation">
        <img src="/assets/icons/message.png" alt="search" />
      </div>
      <div className="channel__user__details--actions">
        <img src="/assets/icons/more.png" alt="close" />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
