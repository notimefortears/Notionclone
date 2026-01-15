import { WebSocketServer } from 'ws';
import * as Y from 'yjs';

const port = 1234;
const wss = new WebSocketServer({ port });

// Store the document state in memory
const doc = new Y.Doc();

wss.on('connection', (ws) => {
  console.log('✨ New collaborator connected');

  // IMPORTANT: Send the initial state as a Buffer
  const state = Y.encodeStateAsUpdate(doc);
  ws.send(Buffer.from(state));

  ws.on('message', (data) => {
    try {
      // Ensure we are working with a Uint8Array
      const update = new Uint8Array(data);
      
      // Apply the update to the server doc
      Y.applyUpdate(doc, update);
      
      // Broadcast to everyone else as binary
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(data); 
        }
      });
    } catch (e) {
      console.error('Update failed:', e.message);
    }
  });
});

console.log(`🚀 RAW SYNC SERVER LIVE ON PORT ${port}`);