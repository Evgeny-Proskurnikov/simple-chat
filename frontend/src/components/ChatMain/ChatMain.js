import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';

function ChatMain({ messages, currentUser }) {
  return (
    <ScrollToBottom debug={false} className="chat__main" scrollViewClassName="chat__main">
      {messages.map((el) => <Message msg={el} key={el.id} currentUser={currentUser} />)}
    </ScrollToBottom>
  );
}

export default ChatMain;
