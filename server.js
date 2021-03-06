const express = require('express');
const app = express();
const http = require('http').createServer(app);
const axios = require('axios');

const PORT = process.env.PORT || 3000

http.listen(PORT,() => {
 console.log('Server Is Running '+PORT)

});

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
  res.sendFile(__dirname + '/index.html');
});

const io = require('socket.io')(http)

io.on('connection',(socket) => {
    console.log('Connected..');

    socket.on('message',(msg) => {
    // socket.broadcast.emit('Message-Vendor',msg);
     io.emit('message', msg);
    });

    socket.on('chat',(data) => {
      socket.broadcast.emit('chat',data);
    });

    socket.on('order',(data) => {
      socket.broadcast.emit('order',data);
    });

  
});

