import React from 'react';

const IsTyping = ({
  user,
}: { user: string }) => (
  <p className="user_typing">{`${user} is typing...`}</p>
);

export default IsTyping;
