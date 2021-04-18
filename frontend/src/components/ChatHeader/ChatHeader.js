import React from 'react';

function ChatHeader({ onLeave, currentUser }) {
  return (
    <div className="chat__header">
      <p className="chat__roomname">{`Room: ${currentUser.room}`}</p>
      <button type="button" className="chat__btn" onClick={onLeave}>Leave</button>
    </div>
  );
}

export default ChatHeader;
