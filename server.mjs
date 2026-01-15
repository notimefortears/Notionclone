import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils.js'; // Added .js
import http from 'http';

const port = 1234;
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Yjs Sync Server\n');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (conn, req) => {
  // This manages the document synchronization automatically
  setupWSConnection(conn, req);
});

server.listen(port, () => {
  console.log(`🚀 Custom Sync Server running at http://localhost:${port}`);
});