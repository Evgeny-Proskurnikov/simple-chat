import React from 'react';
import cn from 'classnames';

function Message({ msg, currentUser }) {
  const isOwn = currentUser.id === msg.authorId;
  const messageClass = cn("message", { "message_own": isOwn });

  return (
    <div className={messageClass}>
      <p className="message__author">{msg.author}</p>
      <p className="message__text">{msg.text}</p>
      <p className="message__time">{msg.time}</p>
    </div>
  );
}

export default Message;
