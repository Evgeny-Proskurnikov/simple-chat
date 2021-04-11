const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const { PORT = 4000 } = process.env;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('user joins!');
  
  socket.on('disconnect', () => {
    console.log('user left');
  })
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
