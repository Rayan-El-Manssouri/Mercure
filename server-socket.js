const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Configuration des options CORS pour Socket.io
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('Client connecté');

  // Gérer l'événement de réception de message
  socket.on('message', (data) => {
    console.log('Message reçu:', data);
    io.emit('message', data);
  });

  // Gérer la déconnexion du client
  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});

// Démarrez le serveur
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Serveur WebSocket écoutant sur le port ${PORT}`);
});