import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { setOpenedChannel, fetchMessages, channelType } from 'actions/channels/actions';
import Auth from 'components/auth';
import truncate from 'lodash/truncate';
import Search from 'components/search';

const mapStateToProps = ({ channel }: RootState) => ({
  ...channel,
});

const mapDispatchToProps = {
  handleSetOpenedChannel: setOpenedChannel,
  handleFetchMessages: fetchMessages,
};

export type ChannelListProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ChannelList = ({
  channels: { list },
  handleSetOpenedChannel,
  handleFetchMessages,
}: ChannelListProps) => {
  const handleSelectChannel = (channel: channelType) => {
    handleSetOpenedChannel(channel.id);
    handleFetchMessages(channel.id);
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleShowSearch = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="channel">
      <Search
        closeModal={closeModal}
        openModal={handleShowSearch}
        modalIsOpen={modalIsOpen}
        users={list}
        handleSelectChannel={handleSelectChannel}
      />
      <Auth />
      <h3>Channels</h3>
      <ul className="channel__groups">
        {Object.values(list).filter((v) => (v.is_channel || v.is_group) && !v.isOpenedChannel)
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
              {channel.hasNewMessage && <span />}
            </li>
          ))}
      </ul>
      <div className="channel__user__details">
        <div className="channel__user__details--info">
          <h3>Recent</h3>
        </div>
        <div className="channel__user__details--actions" onClick={() => handleShowSearch()} onKeyDown={() => handleShowSearch()} role="presentation">
          <img src="/assets/icons/plus.png" alt="search" />
        </div>
      </div>
      <ul className="channel__users">
        {Object.values(list).filter((v) => v.is_im && !v.isOpenedChannel)
          .map((channel) => (
            <li
              key={channel.id}
              title={channel.channelName}
              role="presentation"
              onClick={() => handleSelectChannel(channel)}
              onKeyDown={() => handleSelectChannel(channel)}
            >
              {truncate(channel.channelName, { length: 24 })}
              {channel.hasNewMessage && <span />}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
