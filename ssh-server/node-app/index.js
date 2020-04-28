import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import SSHSocketBridge from './lib/ssh-socket-bridge';
import BridgeMetrics from './lib/bridge-metrics';

const app = express();
const server = http.createServer(app);
const bridgeMetrics = new BridgeMetrics();
const io = socketio(server, { origins: '*:*'});

server.listen(process.env.PORT || '80');
io.on('connection', (socket) => bridgeMetrics.watch(new SSHSocketBridge(socket)));

/** Metrics */
app.get('/', (req, res) => res.send(`
  <h1>Arthur's SSH Bridge Server</h1>
  <ul>
    <li>Created Bridges: ${bridgeMetrics.createdBridges}</li>
    <li>Active Bridges: ${bridgeMetrics.activeBridges}</li>
    <li>Last Created Bridge: ${(new Date(bridgeMetrics.lastCreatedBridge)).toUTCString()}</li>
    <li>Metric Monitoring Uptime: ${bridgeMetrics.uptime}</li>
  </ul>
`));
