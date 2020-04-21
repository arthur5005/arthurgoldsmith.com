import React from 'react';
import { Terminal } from 'xterm';
import '../../node_modules/xterm/css/xterm.css';
import io from 'socket.io-client';

export default class SiteTerminal extends React.Component {
  /** @type {Terminal} */
  terminal = undefined;

  animId = undefined;

  constructor(props) {
    super(props);
    this.terminal = new Terminal({ 
      cursorBlink: true,
      cols: 160
    });
    this.termRef = React.createRef();
  }

  render() {
    return <div ref={this.termRef}>/></div>
  }

  eraseLine() {
    for(let i = 0; i < 160; i++) {
      this.terminal.write('\b');
    }
  }

  showConnectingPrompt() {
    
  }

  connectingPrompStep() {
    this.eraseLine();
    const loaderSpinner = ['|', '/', '-', '|', '\\', ]

    setTimeout(() => {
      
    }, 125);
  }

  endConnectingPrompt() {

  }
  
  componentDidMount() {
    this.terminal.open(this.termRef.current);
    const socket = io('http://localhost:8000');
    const term = this.terminal;



    socket.on("connect", () => {
      term.write("\r\n*** Connected to backend***\r\n");

      // Browser -> Backend
      term.onData(function(data) {
        console.log('Local Terminal: ', data);
        socket.emit("data", data);
      });

      // Backend -> Browser
      socket.on("data", function(data) {

        console.log('Backend Socket: ', data);

        term.write(new Uint8Array(data));
      });

      socket.on("disconnect", function() {
        term.write("\r\n*** Disconnected from backend***\r\n");
      });
    });
  }

  componentWillUnmount() {
    
  }
}