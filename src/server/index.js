var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log(`message - ${msg}`)
    io.emit(`chat message`, msg)
  })
});


http.listen(3001, function(){
  console.log('listening on *:3001');
});