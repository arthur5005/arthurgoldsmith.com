import React from 'react';
import { Terminal } from 'xterm';
import io from 'socket.io-client';
import { FitAddon } from 'xterm-addon-fit';

const terminalStyle = {
  width: '100%',
  height: '100%',
  flexGrow: 1
};

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
    return <div style={terminalStyle} ref={this.termRef}></div>
  }

  wireSocket() {
    if(this.isWired) {
      return;
    }

    this.socket.on('data', (data) => this.terminal.write(typeof data === 'string' ? data : new Uint8Array(data)));

    this.isWired = true;
  }

  unWireSocket() {
    this.socket.removeListener('data');
    this.isWired = false;
  }
  
  componentDidMount() {
    this.socket = io(process.env.WEBSOCKET_HOST || 'http://localhost:8080');

    const fitAddon = new FitAddon();
    this.terminal.loadAddon(fitAddon);
    this.terminal.open(this.termRef.current);
    fitAddon.fit();

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
