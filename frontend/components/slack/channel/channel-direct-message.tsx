import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchMasterList, pushChannel } from 'actions/chat/actions';
import { RootState } from 'reducers';
import size from 'lodash/size';

export interface ownProps {
  closeModal: any,
  modalIsOpen: boolean,
  handleSelectChannel: any,
  handleFetchRecent?: any,
}

const customStyles = {
  content: {
    minWidth: '30rem',
    maxWidth: '30rem',
    maxHeight: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const mapStateToProps = ({ auth, chat }: RootState, ownState: ownProps) => ({
  ...auth,
  ...chat,
  ...ownState,
});

const mapDispatchToProps = {
  handleFetchMasterList: fetchMasterList,
  handlePushChannel: pushChannel,
};

export type SlackChannelDirectMessageProps = ReturnType<typeof mapStateToProps>
  & typeof mapDispatchToProps;

const SlackChannelDirectMessage = ({
  authId,
  token,
  masterList,
  users,
  closeModal,
  modalIsOpen,
  handleSelectChannel,
  handleFetchMasterList,
  handlePushChannel,
}: SlackChannelDirectMessageProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { handleFetchMasterList({ authId, token }); }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectUser = (channel: any) => {
    handlePushChannel(channel.id);
    handleSelectChannel(channel);
    closeModal();
  };

  const renderImage = (channel: any) => {
    if (channel.is_im) {
      return (<img src={users[channel.user].profile.image_48} alt="avatar" style={{ marginRight: 5, width: '1.5rem' }} />);
    }

    if (channel.is_private) {
      return (<img src="/assets/icons/lock.png" alt="avatar" style={{ marginRight: 5, width: '1.5rem' }} />);
    }

    return (<img src="/assets/icons/hashtag.png" alt="avatar" style={{ marginRight: 5, width: '1.5rem' }} />);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="channel__direct__message">
        <div className="channel__direct__message__header">
          <h2>Direct Messages</h2>
          <button type="button" onClick={closeModal}>
            <img src="/assets/icons/close.png" alt="close" />
          </button>
        </div>
        <input
          disabled={size(masterList) <= 0}
          type="text"
          placeholder="Search for people or channel"
          value={searchTerm}
          onChange={handleChange}
        />
        <ul className="channel__direct__message__list">
          {masterList
            .filter((v) => (v.is_im
              ? (
                !users[v.user].is_bot
                && users[v.user].profile.real_name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              : v.is_member && v.name.toLowerCase().includes(searchTerm.toLowerCase())))
            .map((channel) => (
              <li
                key={channel.id}
                title={channel.name}
                role="presentation"
                onClick={() => handleSelectUser(channel)}
                onKeyDown={() => handleSelectUser(channel)}
              >
                {renderImage(channel)}
                {channel.is_im ? users[channel.user].profile.real_name : channel.name}
              </li>
            ))}
        </ul>
      </div>
    </Modal>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SlackChannelDirectMessage);
