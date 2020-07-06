import React from 'react';

export interface MessageProps {
  user: string,
  text: string,
  time: string,
}

// TODO: Add time
const Message = ({
  user,
  text,
  time,
}: MessageProps) => (
  <div className="message">
    <div>
      <p className="message_user">{user}</p>
      <p className="message_text">{text}</p>
    </div>
    <small className="message_time">{time}</small>
  </div>
);

export default Message;
