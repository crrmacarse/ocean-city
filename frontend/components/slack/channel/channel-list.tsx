import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as chatActions from 'actions/chat/actions';
import SlackChannelProfile from 'components/slack/channel/channel-profile';
import SlackChannelDirectMessage from 'components/slack/channel/channel-direct-message';
import SlackChatHeaderContainer from 'components/slack/chat-head/chat-head-container';
import WebSocket from 'components/slack/web-socket';
import truncate from 'lodash/truncate';
import size from 'lodash/size';

const mapStateToProps = ({ auth, chat }: RootState) => ({
  ...auth,
  ...chat,
});

const mapDispatchToProps = {
  ...chatActions,
};

export type SlackChannelListProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const SlackChannelList = ({
  authId,
  token,
  channels: { list },
  setOpenedChannel,
  fetchMessages,
  fetchChannels,
}: SlackChannelListProps) => {
  const [open, setOpen] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => { fetchChannels({ authId, token }); }, [token]);

  const handleSelectChannel = (channel: chatActions.channelType) => {
    setOpenedChannel(channel.id);
    fetchMessages({ token, channelId: channel.id });
  };

  const handleShowSearch = () => {
    if (size(list) > 0) {
      setIsOpen(true);
    }
  };

  const renderChannel = (
    <div className="channel__container">
      <div className="channel">
        <WebSocket />
        {modalIsOpen && (
          <SlackChannelDirectMessage
            closeModal={() => setIsOpen(false)}
            modalIsOpen={modalIsOpen}
            handleSelectChannel={handleSelectChannel}
          />
        )}
        <SlackChannelProfile
          handleSearch={handleShowSearch}
          setCloseChannel={() => setOpen(false)}
        />
        <h3>Channels</h3>
        <hr />
        <ul className="channel__list groups">
          {Object.values(list).filter((v) => (v.is_channel || v.is_group) && !v.isOpenedChannel)
            .sort((a, b) => (
              // eslint-disable-next-line no-nested-ternary
              (a.channelName > b.channelName) ? 1 : ((b.channelName > a.channelName) ? -1 : 0)
            ))
            .map((channel) => (
              <li
                key={channel.id}
                title={channel.channelName}
                role="presentation"
                className={`${channel.hasNewMessage && 'hasNewMessage'}`}
                onClick={() => handleSelectChannel(channel)}
                onKeyDown={() => handleSelectChannel(channel)}
              >
                {truncate(channel.channelName, { length: 40 })}
              </li>
            ))}
        </ul>
        <h3>Recent</h3>
        <hr />
        <ul className="channel__list users">
          {Object.values(list).filter((v) => v.is_im && !v.isOpenedChannel && !v.user.is_bot)
            // .slice(0, 20) // There should be a better alternative
            .sort((a, b) => (
              // eslint-disable-next-line no-nested-ternary
              (a.channelName > b.channelName) ? 1 : ((b.channelName > a.channelName) ? -1 : 0)
            ))
            .map((channel) => (
              <li
                key={channel.id}
                title={channel.channelName}
                className={channel.hasNewMessage && 'hasNewMessage'}
                role="presentation"
                onClick={() => handleSelectChannel(channel)}
                onKeyDown={() => handleSelectChannel(channel)}
              >
                <span className={`${channel.presence === 'away' && 'away'}`} />
                {truncate(channel.channelName, { length: 24 })}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );

  const renderOpenChannelButton = (
    <button className="channel__open__channel" type="button" onClick={() => setOpen(true)}>
      <img src="/assets/icons/slack.png" alt="Open Slack" />
      <span>Open Slack</span>
    </button>
  );

  return (
    <Fragment>
      {open ? renderChannel : renderOpenChannelButton}
      <SlackChatHeaderContainer className={`${open ? 'open' : 'close'}`} />
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SlackChannelList);
