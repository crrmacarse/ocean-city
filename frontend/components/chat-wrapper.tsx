import React, { ReactNode } from 'react';

const ChatWrapper = ({ children }: { children: ReactNode }) => (
  <div className="chat__wrapper">
    {children}
    <div />
  </div>
);

export default ChatWrapper;
