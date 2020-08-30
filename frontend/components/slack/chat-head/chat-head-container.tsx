import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import * as chatActions from 'actions/chat/actions';
import SlackChatHead from 'components/slack/chat-head/chat-head';

export interface ownProps {
  className: string,
}

const mapStateToProps = ({ chat }: RootState, ownState: ownProps) => ({
  ...chat,
  ...ownState,
});

const mapDispatchToProps = {
  ...chatActions,
};

export type SlackChatHeadContainerProps = ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const SlackChatHeadContainer = ({
  className,
  channels: { list },
}: SlackChatHeadContainerProps) => (
  <div className={`chat__head__container ${className}`}>
    {Object.values(list)
      .filter((c) => c.isOpenedChannel)
      .map((c) => (
        <SlackChatHead
          key={c.id}
          channelId={c.id}
          channelName={c.channelName}
          messages={c.messages}
          hasNewMessage={c.hasNewMessage}
        />
      ))}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SlackChatHeadContainer);
