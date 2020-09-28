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

const token = "1e6947ac7fb3a9529a9726eb692c8cc5";

// axios.get("http://urmenu.co.uk/api/get/vendor", {
//   token: token,
// })
// .then((response) => {
//   vendors = response;
//   console.log(vendors);
// })
// .catch(function(error) {
//   console.log(error);
// })

console.log("Hey");

const io = require('socket.io')(http)

io.on('connection',(socket) => {
    console.log('Connected..');

    socket.on('message',(msg) => {
    // socket.broadcast.emit('Message-Vendor',msg);
     io.emit('message', msg);
    });

  
});

