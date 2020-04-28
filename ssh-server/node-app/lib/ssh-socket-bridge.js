import SSH2 from 'ssh2';
import EventEmitter from 'events';

const { Client: SSHClient } = SSH2;

export default class SSHSocketBridge extends EventEmitter {
  socket = null;
  sshConfig = null;
  sshWindowSettings = null;
  stream = null;
  isDestroyed = false;

  constructor(socket) {
    super();

    this.socket = socket;
    this.sshClient = new SSHClient();

    this.sshWindowSettings = { 
      rows: 24, 
      cols: 160,
      height: 480, 
      width: 640, 
      term: 'xterm-256color'
    };
    
    this.sshConfig = {
      host: 'localhost', 
      port: '2222',
      username: 'visitor',
      password: 'visitor'
    };

    this.wireClientToBridge();
    this.connectClient();

    this.emit('created');

    console.debug('Bridge created socket id: ', socket.id);
  }

  wireClientToBridge() {
    this.sshClient.on('ready', this.handleClientReady.bind(this));
    this.sshClient.on('close', this.handleClientClose.bind(this));
    this.sshClient.on('error', this.handleClientError.bind(this));
  }

  connectClient() {
    console.debug('data', '*** CALLING SSH.CONNECT ***');
    console.debug('data', `*** port: ${this.sshConfig.port}  ***`);
    console.debug('data', `*** host: ${this.sshConfig.host}  ***`);
    console.debug('data', `*** username: ${this.sshConfig.username}  ***`);
  
    this.sshClient.connect(this.sshConfig);
  }

  handleClientClose() {
    this.emit('clientDisconnected');

    this.socket.emit('data', '\r\n*** CONNECTION CLOSED ***\r\n');
    this.destroyBridge();
  }

  handleStreamClose() {
    this.emit('shellStreamClosed');

    this.socket.emit('data', '\r\n*** SHELL STREAM CLOSED ***\r\n');
    this.destroyBridge();
  }

  handleSocketDisconnect() {
    this.emit('shellStreamClosed');

    console.debug('*** SOCKET DISCONNECTED ***');
    this.destroyBridge();
  }

  handleClientError(err) {
    this.socket.emit('data', `\r\n*** CONNECTION ERROR: ${err.message} ***\r\n`)
    this.destroyBridge();
  }

  handleShellError(err) {
    this.socket.emit('data', `\r\n*** SSH SHELL ERROR: ${err.message} ***\r\n`);
    this.destroyBridge();
  }

  handleClientReady() {
    this.socket.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
    this.sshClient.shell(this.sshWindowSettings, this.handleShell.bind(this));
  }

  handleShell(err, stream) {
    if (err) {
      return this.handleShellError(err);
    }
    this.stream = stream;

    this.wireSocketToStream();
  }

  /** The beef */
  wireSocketToStream() {
    this.socket.on('data', (data) => this.stream.write(data));
    this.stream.on('data', (data) => this.socket.emit('data', data));
    
    this.stream.on('close', this.handleStreamClose.bind(this));
    this.socket.on('disconnect', this.handleSocketDisconnect.bind(this));

    this.emit('connected');
  }

  destroyBridge() {
    if(!this.isDestroyed) {
      this.isDestroyed = true;

      this.socket.disconnect(true);
      this.sshClient.end();

      this.socket.removeAllListeners();
      this.stream.removeAllListeners();
      this.sshClient.removeAllListeners();
      
      this.socket = null;
      this.sshConfig = null;
      this.sshWindowSettings = null;
      this.stream = null;

      this.emit('destroyed');
      this.removeAllListeners();
    }
  }
} 
