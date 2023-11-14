const express = require('express');
const server = require('http').createServer();
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname});
});

server.on('request', app);
server.listen(PORT, function() {console.log('Server started on port 3000')});

process.on('SIGINT', () => {
    console.log('sigint');
    wss.clients.forEach(function each(client) {
        client.close();
    });
    server.close(() => {
        shutdownDB();
    })
})
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

  addVisitorRecord(numClients);

  ws.on('close', function close () {
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
};

/** End websockets */

/** Begin database */
const sqlite = require('sqlite3');
const db = new sqlite.Database(':memory:');

db.serialize(() => {
    db.run(`
        CREATE TABLE visitors (
            count INTEGER,
            time TEXT
        )
    `)
});

function addVisitorRecord(count) {
  db.run(`INSERT INTO visitors (count, time)
        VALUES (${count}, datetime('now'))
    `);
};

function getCounts() {
  db.each('SELECT * FROM visitors', (err, row) => {
    console.log('visitor record:', row);
  });
};

function shutdownDB() {
  getCounts();
  console.log('Shutting down db');
  db.close();
};


