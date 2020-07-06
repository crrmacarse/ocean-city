import React from 'react';
import IsTyping from 'components/is-typing';

const Input = () => (
  <div className="input">
    <IsTyping user="Christian Ryan Macarse" />
    <div>
      <input type="text" />
      <button type="submit">SEND</button>
    </div>
  </div>
);

export default Input;
