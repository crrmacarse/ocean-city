import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as channelActions from 'actions/channels/actions';
import Chat from 'components/chat';

const mapStateToProps = ({ channel }: RootState) => ({
  ...channel,
});

const mapDispatchToProps = {
  ...channelActions,
};

export type BottomProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Bottom = ({
  channels: { list },
  fetchChannels,
}: BottomProps) => {
  useEffect(() => { fetchChannels(); }, []);

  return (
    <div className="bottom__panel">
      {Object.values(list)
        .filter((c) => c.isOpenedChannel)
        .map((c) => (
          <Chat
            key={c.id}
            channelId={c.id}
            channelName={c.channelName}
            messages={c.messages}
            hasNewMessage={c.hasNewMessage}
          />
        ))}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Bottom);
