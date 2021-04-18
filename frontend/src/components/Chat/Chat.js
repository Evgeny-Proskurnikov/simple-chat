import React from 'react';
import io from 'socket.io-client';
import { ENDPOINT } from '../../utils/config';
import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatMain from '../ChatMain/ChatMain';
import Loading from '../Loading/Loading';

let socket;

function Chat({
  loginData,
  onLeave,
  onMsgRecieve,
  messages,
  onUserRecieve,
  currentUser,
  onRoomDataRecieve,
  currentRoom,
}) {
  // при первом рендере компонента устанавливаем WS соединение
  React.useEffect(() => {
    socket = io(ENDPOINT);

    // Создаём событие по которому сервер примет данные логина
    socket.emit('join', loginData, (error) => {
      // Коллбэк выполнится после обработки события на сервере
      // если вернётся ошибка, то очищаем стейт, удаляем слушатели
      // и отключаемся от соединения
      if (error) {
        onLeave();
        socket.removeAllListeners();
        socket.disconnect();
        alert(`Error: ${error}`);
      }
    });
    
    // При размонтировании компонента делаем то же, что при обработке ошибки
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      onLeave();
    }
  }, []); // eslint-disable-line

  // При первом рендере устанавливаем слушатели входящих сообщений,
  // информации о комнате и пользователе.
  // При получении события обновляем стейт.
  React.useEffect(() => {
    socket.on('message', (msg) => {
      onMsgRecieve(messages => [...messages, msg]);
    });
    socket.on("roomData", (room) => {
      onRoomDataRecieve(room);
    });
    socket.on('userData', (user) => {
      onUserRecieve(user);
    });
  }, []); // eslint-disable-line

  // Создаём событие и отправляем сообщение по клику кнопки Send
  function onSend(message) {
    socket.emit('message', message);
  }

  return (
    <div className="chat">
      {currentUser.name ? 
        <div className="chat__container">
          <ChatHeader currentUser={currentUser} onLeave={onLeave} />
          <ChatMain messages={messages} currentUser={currentUser} currentRoom={currentRoom} />
          <ChatForm onSend={onSend} />
        </div> :
        <Loading />
      }
    </div>
  );
}

export default Chat;
