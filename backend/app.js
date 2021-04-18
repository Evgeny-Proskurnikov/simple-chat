const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const routers = require('./routers/index');
const { HOSTS } = require('./utils/config');
const { addUser, getUser, getUsersInRoom, removeUser } = require('./controllers/users');
const { getCurrentTime } = require('./utils/utils');

const { PORT = 4000 } = process.env;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: HOSTS,
  }
});

app.use(routers);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit('userData', user);
    socket.emit('message', {
      author: 'Chat-bot',
      text: `${user.name}, welcome to ${user.room} room.`,
      time: getCurrentTime(),
      id: uuidv4()
    });
    socket.broadcast.to(user.room).emit('message', {
      author: 'Chat-bot',
      text: `${user.name} has joined.`,
      time: getCurrentTime(),
      id: uuidv4()
    });
    socket.join(user.room);

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  })

  socket.on('message', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
      author: user.name,
      text: message.msg,
      time: getCurrentTime(),
      id: uuidv4(),
      authorId: user.id
    });

    callback();
  });
  
  socket.on('disconnect', () => {
    console.log('user left');
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', {
        author: 'Chat-bot', 
        text: `${user.name} has left.`, 
        time: getCurrentTime(),
        id: uuidv4()
      })
      io.to(user.room).emit('roomData', { 
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  })
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
