import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { setOpenedChannel, fetchMessages, channelType } from 'actions/channels/actions';
import Profile from 'components/profile';
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

  function closeSearch() {
    setIsOpen(false);
  }

  return (
    <div className="channel">
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
              {channel.hasNewMessage && <span />}
            </li>
          ))}
      </ul>
      <h3>Recent</h3>
      <hr />
      <ul className="channel__users">
        {Object.values(list).filter((v) => v.is_im && !v.isOpenedChannel)
          // .slice(0, 20) // There should be a better alternative
          .sort((a, b) => (
            // eslint-disable-next-line no-nested-ternary
            (a.channelName > b.channelName) ? 1 : ((b.channelName > a.channelName) ? -1 : 0)
          ))
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
