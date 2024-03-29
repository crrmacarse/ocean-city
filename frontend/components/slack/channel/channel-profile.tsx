import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as authActions from 'actions/auth/actions';

export interface ownProps {
  handleSearch: any,
  setCloseChannel: () => void,
}

const mapStateToProps = ({ auth }: RootState, ownState: ownProps) => ({
  ...auth,
  ...ownState,
});

const mapDispatchToProps = {
  ...authActions,
};

export type SlackChannelProfileProps = ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const SlackChannelProfile = ({
  fetchUserIdentity,
  token,
  user,
  handleSearch,
  setCloseChannel,
}: SlackChannelProfileProps) => {
  const { name, avatar, fetched } = user;

  useEffect(() => {
    if (!fetched) {
      fetchUserIdentity(token);
    }
  }, []);

  return (
    <div className="channel__user__profile">
      <div className="channel__user__profile--info">
        <img src={avatar} alt="avatar" />
        <p>{name}</p>
      </div>
      <div className="channel__user__profile--actions">
        <button type="button" onClick={() => handleSearch()} title="Direct Message">
          <img src="/assets/icons/message.png" alt="Direct Message" />
        </button>
        <button type="button" title="More Actions">
          <img src="/assets/icons/more.png" alt="More" />
        </button>
        <button type="button" onClick={setCloseChannel} title="Close Slack">
          <img src="/assets/icons/close.png" alt="Close Slack" />
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SlackChannelProfile);
