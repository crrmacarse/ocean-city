import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchMasterList, pushChannel } from 'actions/channels/actions';
import { RootState } from 'reducers';

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

const mapStateToProps = ({ channel }: RootState, ownState: ownProps) => ({
  ...channel,
  ...ownState,
});

const mapDispatchToProps = {
  handleFetchMasterList: fetchMasterList,
  handlePushChannel: pushChannel,
};

export type SearchProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Search = ({
  masterList,
  users,
  closeModal,
  modalIsOpen,
  handleSelectChannel,
  handleFetchMasterList,
  // eslint-disable-next-line no-unused-vars
  handlePushChannel,
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { handleFetchMasterList(); }, []);

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
      return (<img src={users[channel.user].profile.image_48} alt="avatar" style={{ marginRight: 5 }} />);
    }

    if (channel.is_private) {
      return (<img src="/assets/icons/lock.png" alt="avatar" style={{ marginRight: 5, width: '1rem' }} />);
    }

    return (<img src="/assets/icons/hashtag.png" alt="avatar" style={{ marginRight: 5, width: '1rem' }} />);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="search">
        <div
          style={{
            display: 'flex',
            alignContent: 'start',
            justifyContent: 'space-between',
          }}
        >
          <h2>Direct Messages</h2>
          <button type="button" onClick={closeModal}>
            <img src="/assets/icons/close.png" alt="close" style={{ width: '0.8rem' }} />
          </button>
        </div>
        <input
          style={{
            width: '100%',
          }}
          type="text"
          placeholder="Search for people or channel"
          value={searchTerm}
          onChange={handleChange}
        />
        <ul className="channel__users" style={{ padding: 0 }}>
          {masterList
            .filter((v) => (v.is_im
              ? (
                !users[v.user].is_bot
                && users[v.user].profile.real_name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              : v.is_member && v.name.toLowerCase().includes(searchTerm.toLowerCase())))
            .map((channel) => (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: 5,
                  overflow: 'auto',
                }}
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
export default connect(mapStateToProps, mapDispatchToProps)(Search);
