import React, { ReactNode, useState } from 'react';
import ChannelList from 'components/channel-list';

// @TODO: Toggle chatbox here
const Bottom = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bottom__panel">
      <div className="bottom__panel__container">
        {children}
        <div className="bottom__panel__toggle">
          {open && <ChannelList onClose={() => setOpen(false)} />}
          <button type="button" onClick={() => setOpen(!open)}>
            Channels
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
