import React, { ReactNode } from 'react';

const Header = ({ children }: { children: ReactNode }) => (
  <header>
    <div>
      <h1>Slack Messenger Demo</h1>
      <p>This is only a demo that intends to showcase Slack API integration</p>
    </div>
    {children}
  </header>
);

export default Header;
