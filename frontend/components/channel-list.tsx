import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { setOpenChannel, setActiveChannel, channelType } from 'actions/channels/actions';
import truncate from 'lodash/truncate';

const mapStateToProps = ({ channel }: RootState, ownProps: { onClose: () => void }) => ({
  ...channel,
  ...ownProps,
});

const mapDispatchToProps = {
  handleSetOpenChannel: setOpenChannel,
  handleSetActiveChannel: setActiveChannel,
};

export type ChannelListProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ChannelList = ({
  channels: { list },
  handleSetOpenChannel,
  handleSetActiveChannel,
  onClose,
}: ChannelListProps) => {
  const handleSelectChannel = (channel: channelType) => {
    handleSetActiveChannel(channel.id);
    handleSetOpenChannel(channel);
    onClose();
  };

  return (
    <div className="channel__list">
      <h3>Channels</h3>
      <ul>
        {list.map((channel) => (
          <li
            title={channel.name}
            role="presentation"
            onClick={() => handleSelectChannel(channel)}
            onKeyDown={() => handleSelectChannel(channel)}
          >
            <small><b>{`[${channel.id}] `}</b></small>
            {truncate(channel.name, { length: 24 })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
