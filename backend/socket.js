const { Server } = require('socket.io');

function setupSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle new message
    socket.on('send_message', (messageData) => {
      // Broadcast message to all connected clients
      io.emit('receive_message', {
        ...messageData,
        timestamp: new Date().toISOString()
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
}

module.exports = setupSocketServer;