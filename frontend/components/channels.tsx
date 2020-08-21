import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as channelActions from 'actions/channels/actions';
import Profile from 'components/profile';
import truncate from 'lodash/truncate';
import WebSocket from 'components/slack/web-socket';
import Search from 'components/search';

const mapStateToProps = ({ auth, channel }: RootState) => ({
  ...auth,
  ...channel,
});

const mapDispatchToProps = {
  ...channelActions,
};

export type ChannelListProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ChannelList = ({
  authId,
  token,
  channels: { list },
  setOpenedChannel,
  fetchMessages,
  fetchChannels,
}: ChannelListProps) => {
  useEffect(() => { fetchChannels({ authId, token }); }, [token]);

  const handleSelectChannel = (channel: channelActions.channelType) => {
    setOpenedChannel(channel.id);
    fetchMessages({ token, channelId: channel.id });
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleShowSearch = () => {
    setIsOpen(true);
  };

  function closeSearch() {
    setIsOpen(false);
  }

  return (
    <div className="channel">
      <WebSocket />
      {modalIsOpen ? (
        <Search
          closeModal={closeSearch}
          modalIsOpen={modalIsOpen}
          handleSelectChannel={handleSelectChannel}
        />
      ) : <div />}
      <Profile handleSearch={handleShowSearch} />
      <h3>Channels</h3>
      <hr />
      <ul className="channel__groups">
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
              {channel.hasNewMessage && <span className="hasNewMessage" />}
            </li>
          ))}
      </ul>
      <h3>Recent</h3>
      <hr />
      <ul className="channel__users">
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
              {truncate(channel.channelName, { length: 24 })}
              <span className={`${channel.hasNewMessage && 'hasNewMessage'} ${channel.presence === 'away' && 'away'}`} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
