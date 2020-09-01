import React, { ReactNode } from 'react';

const SlackChatHeadWrapper = ({ children }: { children: ReactNode }) => (
  <div className="chat__head__wrapper">
    {children}
    <div />
  </div>
);

export default SlackChatHeadWrapper;
