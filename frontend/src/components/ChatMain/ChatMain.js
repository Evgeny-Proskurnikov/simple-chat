import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';
import Sidebar from '../Sidebar/Sidebar';

function ChatMain({ messages, currentUser, currentRoom }) {
  return (
    <div className="chat__main">
      <Sidebar currentRoom={currentRoom} />
      <ScrollToBottom debug={false} className="chat__msg-field" scrollViewClassName="chat__msg-field">
        {messages.map((el) => <Message msg={el} key={el.id} currentUser={currentUser} />)}
      </ScrollToBottom>
    </div>
  );
}

export default ChatMain;
