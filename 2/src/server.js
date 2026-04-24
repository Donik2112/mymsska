require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  socket.on('send_message', (data) => {
    socket.to(data.receiverId).emit('receive_message', data);
  });
});

connectDB().then(() => {
  server.listen(3000, () => console.log('Server running'));
});