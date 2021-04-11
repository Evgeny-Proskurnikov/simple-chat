import React from 'react';

function Message({ msg }) {
  return (
    <div className="message">
      <p className="message__author">{msg.author}</p>
      <p className="message__text">{msg.text}</p>
      <p className="message__time">{msg.time}</p>
    </div>
  );
}

export default Message;
