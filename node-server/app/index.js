// const fs = require("fs");
const express = require("express");
const http = require("http");
const SSHClient = require("ssh2").Client;
const utf8 = require("utf8");

const app = express();
const server = http.createServer(app);
server.listen(8000);

const io = require("socket.io")(server);

const sshWindowSettings = { 
  rows: 24, 
  cols: 160,
  height: 480, 
  width: 640, 
  term: 'xterm-256color'
};

io.on("connection", function(socket) {
  const ssh = new SSHClient();

  ssh.on("ready", function() {

    socket.emit("data", "\r\n*** CONNECTION ESTABLISHED ***\r\n");
    connected = true;

    ssh.shell(sshWindowSettings, function(err, stream) {
      if (err) {
        return socket.emit(
          "data",
          "\r\n*** SSH SHELL ERROR: " + err.message + " ***\r\n"
        );
      }
        
      socket.on("data", function(data) {
        stream.write(data);
      });

      stream.on("data", function(data) {
        socket.emit("data", data);
      });

      stream.on("close", function() {
        ssh.end();
      });
    });
  })

  ssh.on("close", function() {
    socket.emit("data", "\r\n*** CONNECTION CLOSED ***\r\n");
  })

  ssh.on("error", function(err) {
    console.log(err);
    socket.emit(
      "data",
      "\r\n*** CONNECTION ERROR: " + err.message + " ***\r\n"
    );
  })
  
  ssh.connect({
    host: "agoldsmith-ssh", //TODO: Environment Variable
    port: "2222", //TODO: Environment Variable
    username: "visitor", //TODO: Environment Variable
    password: "visitor" //TODO: Environment Variable
    // privateKey: require("fs").readFileSync("PATH OF KEY ") // <---- Uncomment this if you want to use privateKey ( Example : AWS )
  });
});
