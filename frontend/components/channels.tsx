import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { setOpenedChannel, fetchMessages, channelType } from 'actions/channels/actions';
import truncate from 'lodash/truncate';

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

  return (
    <div className="channel">
      <div className="channel__user__details">
        <div className="channel__user__details--info">
          <img src="/assets/logo.png" alt="avatar" />
          <p>Christian Ryan Macarse</p>
        </div>
        <div className="channel__user__details--actions">
          <div>N</div>
          <div>M</div>
        </div>
      </div>
      <h3>Channels</h3>
      <ul className="channel__groups">
        {Object.values(list).filter((v) => v.is_channel || v.is_group)
          .map((channel) => (
            <li
              key={channel.id}
              title={channel.channelName}
              role="presentation"
              onClick={() => handleSelectChannel(channel)}
              onKeyDown={() => handleSelectChannel(channel)}
            >
              {truncate(channel.channelName, { length: 40 })}
            </li>
          ))}
      </ul>
      <h3>Recent</h3>
      <ul className="channel__users">
        {Object.values(list).filter((v) => v.is_im)
          .map((channel) => (
            <li
              key={channel.id}
              title={channel.channelName}
              role="presentation"
              onClick={() => handleSelectChannel(channel)}
              onKeyDown={() => handleSelectChannel(channel)}
            >
              {truncate(channel.channelName, { length: 24 })}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
