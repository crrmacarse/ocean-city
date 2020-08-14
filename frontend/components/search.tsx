import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import truncate from 'lodash/truncate';

export interface ownProps {
  closeModal: any,
  modalIsOpen: boolean,
  users: any,
  handleSelectChannel: any,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Search = ({
  closeModal,
  modalIsOpen,
  users,
  handleSelectChannel,
}: ownProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectUser = (channel: any) => {
    handleSelectChannel(channel);
    closeModal();
  };

  useEffect(() => {
    // eslint-disable-next-line max-len
    const results = Object.values(users).filter((v) => v.is_im && !v.isOpenedChannel).filter((v) => v.channelName.toLowerCase().includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm]);
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div
          style={{
            display: 'flex',
            float: 'right',
            width: '1rem',
          }}
          onClick={closeModal}
          onKeyDown={closeModal}
          role="presentation"
        >
          <img src="/assets/icons/close.png" alt="close" />
        </div>
        <div>
          <h2>Direct Messages</h2>
        </div>
        <input
          style={{
            width: '100%',
          }}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        Recent
        <ul style={{ padding: 0 }}>
          {searchTerm === '' ? Object.values(users).filter((v) => v.is_im && !v.isOpenedChannel)
            .map((channel) => (
              <li
                style={{ display: 'flex', alignItems: 'center' }}
                key={channel.id}
                title={channel.channelName}
                role="presentation"
                onClick={() => handleSelectUser(channel)}
                onKeyDown={() => handleSelectUser(channel)}
              >
                <img src={channel.user.profile.image_48} alt="avatar" style={{ marginRight: 5 }} />
                {truncate(channel.channelName, { length: 24 })}
                {channel.hasNewMessage && <span />}
              </li>
            )) : searchResults.map((channel) => (
              <div>
                <li
                  style={{ display: 'flex', alignItems: 'center' }}
                  key={channel.id}
                  title={channel.channelName}
                  role="presentation"
                  onClick={() => handleSelectUser(channel)}
                  onKeyDown={() => handleSelectUser(channel)}
                >
                  <img src={channel.user.profile.image_48} alt="avatar" />
                  {truncate(channel.channelName, { length: 24 })}
                  {channel.hasNewMessage && <span />}
                </li>
              </div>

          ))}
        </ul>
      </Modal>
    </div>
  );
};
export default Search;
