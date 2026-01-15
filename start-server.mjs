// start-server.mjs
import { execSync } from 'child_process';

console.log("Starting Y-Websocket Server...");

try {
  // This executes the server script directly using node
  execSync('PORT=1234 node ./node_modules/y-websocket/bin/server.js', { stdio: 'inherit' });
} catch (e) {
  console.error("Failed to start server. Make sure y-websocket is installed.");
}