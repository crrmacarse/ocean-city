import React, { ReactNode } from 'react';

// Should be the wrapper
const ChatWrapper = ({ children }: { children: ReactNode }) => (
  <div className="chat__wrapper">
    {children}
    <div />
  </div>
);

export default ChatWrapper;
