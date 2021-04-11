import React from 'react';
import { messages } from '../../utils/data';
import ChatForm from '../ChatForm/ChatForm';
import Message from '../Message/Message';

function Chat({ chatRoom }) {
  return (
    <div className="chat">
      <div className="chat__container">
        <div className="chat__header">
          <p className="chat__roomname">{`Room: ${chatRoom}`}</p>
          <button type="button" className="chat__btn">Leave</button>
        </div>
        <div className="chat__main">
          {messages.map((el) => <Message msg={el} key={el.time + el.text} />)}
        </div>
        <ChatForm />
      </div>
    </div>
  );
}

export default Chat;
