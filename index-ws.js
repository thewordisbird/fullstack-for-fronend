const express = require('express');
const server = require('http').createServer();
const app = express();
<<<<<<< Updated upstream
=======
const PORT = 3000;
>>>>>>> Stashed changes

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname});
});

server.on('request', app);
<<<<<<< Updated upstream
server.listen(3000, function() {console.log('Server started on port 3000')});
=======

server.listen(PORT, function() {console.log('Server started on port 3000')});
>>>>>>> Stashed changes

/** Begin websockets */
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server: server});

wss.on('connection', function connection (ws) {
  const numClients = wss.clients.size;
  console.log('Clients connected', numClients);

  wss.broadcast(`current visitors ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send('Welcome to my server');
  }

  ws.on('close', function close () {
<<<<<<< Updated upstream
    wss.broadcast(`Current visitors: ${numClients}`);
    console.log('A client has disconnected');
  });

});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  })
=======
    wss.broadcast(`Current visitors: ${wss.clients.size}`);
    console.log('A client has disconnected');
  });

  ws.on('error', function error () {
    //
  });
});

/** Broadcast data to all connected clients */
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
>>>>>>> Stashed changes
};


