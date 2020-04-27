import React from 'react';
import { Terminal } from 'xterm';
import io from 'socket.io-client';

export default class SiteTerminal extends React.Component {
  /** @type {Terminal} */
  terminal = undefined;

  /** @type {boolean} Will be set to true once events to the socket are wired. Guard against double wiring */
  isWired = false;

  constructor(props) {
    super(props);

    this.terminal = new Terminal({ 
      cursorBlink: true,
      cols: 160
    });

    this.termRef = React.createRef();
  }

  render() {
    return <div ref={this.termRef}></div>
  }

  wireSocket() {
    if(this.isWired) {
      return;
    }

    this.socket.on('data', (data) => {
      console.debug('Backend Socket: ', data);
      this.terminal.write(new Uint8Array(data));
    });

    this.isWired = true;
  }

  unWireSocket() {
    this.socket.removeListener('data');
    this.isWired = false;
  }
  
  componentDidMount() {
    this.socket = io(process.env.WEBSOCKET_HOST || 'http://localhost:8080');
    this.terminal.open(this.termRef.current);

    this.terminal.onData((data) => {
      console.debug('Local Terminal: ', data);
      this.isWired && this.socket.emit('data', data);
    });

    this.socket.on('connect', () => {
      this.terminal.write('\r\n*** Connected to backend ***\r\n');
      this.wireSocket();
    });

    this.socket.on('disconnect', (reason) => {
      this.terminal.write('\r\n*** Disconnected from backend***\r\n');
      this.unWireSocket();
    });
  }
  
  componentWillUnmount() {
    this.socket.removeAllListeners();
    this.terminal.removeAllListeners();
  }
}
