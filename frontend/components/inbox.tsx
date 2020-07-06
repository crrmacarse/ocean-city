import React, { ReactNode } from 'react';
import Input from 'components/input';

const Inbox = ({ children }: { children: ReactNode }) => (
  <div className="inbox">
    <div>
      {children}
    </div>
    <Input />
  </div>
);

export default Inbox;
