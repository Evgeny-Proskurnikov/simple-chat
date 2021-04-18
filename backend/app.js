const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const routers = require('./routers/index');
const { HOSTS } = require('./utils/config');
const { addUser, getUser, getUsersInRoom, removeUser } = require('./controllers/users');
const { getCurrentTime } = require('./utils/utils');

// устанавливаем порт по умолчанию, либо принимаем из переменной окружения
const { PORT = 4000 } = process.env;

// связываем socketio c приложением
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  // для возможности получения запросов с других хостов активируем cors
  cors: {
    origin: HOSTS,
  }
});

// мидлвэр для роутинга
app.use(routers);

// устанавливаем слушатель WS соединения
io.on('connection', (socket) => {
  // слушаем событие подключения клиента, при подключении принимаем данные 
  socket.on('join', ({ name, room }, callback) => {
    // добавляем нового пользователя, в деструктуризации вернётся пользователь
    // либо ошибка
    const { error, user } = addUser({ id: socket.id, name, room });

    // если вернулась ошибка, вызываем переданный колбэк на клиенте
    if (error) return callback(error);

    // создаём событие отправки инфо пользователя
    socket.emit('userData', user);
    // создаём событие отправки оповещения о коннекте пользователя
    socket.emit('message', {
      author: 'Chat-bot',
      text: `${user.name}, welcome to ${user.room} room.`,
      time: getCurrentTime(),
      id: uuidv4()
    });
    // то же событие для остальных пользователей комнаты
    socket.broadcast.to(user.room).emit('message', {
      author: 'Chat-bot',
      text: `${user.name} has joined.`,
      time: getCurrentTime(),
      id: uuidv4()
    });
    // присоединяемся к комнате
    socket.join(user.room);

    // отправляем клиенту данные о текущей комнате
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
  })

  // принимаем сообщение от клиента
  socket.on('message', (message) => {
    const user = getUser(socket.id);

    // модифицируем сообщение и отправляем клиенту
    // в комнату пользователя
    io.to(user.room).emit('message', {
      author: user.name,
      text: message.msg,
      time: getCurrentTime(),
      id: uuidv4(),
      authorId: user.id
    });
  });
  
  // при отключении WS соединения
  socket.on('disconnect', () => {
    // удаляем пользователя и возвращаем в переменную user
    const user = removeUser(socket.id);

    // если пользовтель удалён, отправляем сообщение в комнату
    // о выходе пользователя.
    if(user) {
      io.to(user.room).emit('message', {
        author: 'Chat-bot', 
        text: `${user.name} has left.`, 
        time: getCurrentTime(),
        id: uuidv4()
      })
      // отправляем обновлённые данные комнаты
      io.to(user.room).emit('roomData', { 
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  })
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
