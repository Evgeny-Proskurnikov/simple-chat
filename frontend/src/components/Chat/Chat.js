import React from 'react';
import io from 'socket.io-client';
import { ENDPOINT } from '../../utils/config';
import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatMain from '../ChatMain/ChatMain';

let socket;

function Chat({
  loginData,
  onLeave,
  onMsgRecieve,
  messages,
  onUserRecieve,
  currentUser,
  onRoomDataRecieve,
  roomData
}) {
  React.useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit('join', loginData, (error) => {
      if (error) {
        alert(error);
      }
    });
  
    return () => {
      socket.removeAllListeners();
      onLeave();
    }
  }, []); // eslint-disable-line

  React.useEffect(() => {
    socket.on('message', (msg) => {
      onMsgRecieve(messages => [...messages, msg]);
    });
    socket.on("roomData", ({ users }) => {
      onRoomDataRecieve(users);
    });
    socket.on('userData', (user) => {
      onUserRecieve(user);
    });
  }, []); // eslint-disable-line

  function onSend(message) {
    socket.emit('message', message);
  }

  return (
    <div className="chat">
      <div className="chat__container">
        <ChatHeader currentUser={currentUser} onLeave={onLeave} />
        <ChatMain messages={messages} currentUser={currentUser} />
        <ChatForm onSend={onSend} />
      </div>
    </div>
  );
}

export default Chat;
