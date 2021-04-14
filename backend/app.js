const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const routers = require('./routers/index');
const { HOSTS } = require('./utils/config');

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
  console.log('user joins!');

  socket.on('join', ({ user, room }, callback) => {
    console.log(user, room)
  })
  
  socket.on('disconnect', () => {
    console.log('user left');
  })
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
