import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';

const mapStateToProps = ({ channel }: RootState) => ({
  ...channel,
});

export type ChannelListProps = ReturnType<typeof mapStateToProps>;

const ChannelList = ({
  channels: { list },
}: ChannelListProps) => (
  <div className="channel__list">
    <h3>Channels</h3>
    <ul>
      {list.map((l) => (
        <li>
          <small><b>{`[${l.id}] `}</b></small>
          {l.name}
        </li>
      ))}
    </ul>
  </div>
);

export default connect(mapStateToProps)(ChannelList);
