var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(3000);
io.on('connection', function(socket) {
    console.log("connected");
    var redisClient = redis.createClient();
    redisClient.subscribe('message');
    redisClient.on("message", function(channel, data) {
        console.log("new message add in queue " + channel + " channel");
        socket.emit(channel, data);
    });

    socket.on('disconnect', function() {
        redisClient.quit();
    });
});




// var express = require('express');
// var https = require('https');
// var fs = require('fs');
// var server = express();
// var redis = require('redis');

// var sslOptions = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('key.crt')
// };

// var createdServer = https.createServer(sslOptions, server);
// createdServer.listen(3001, function(){
//     console.log('running...');
// });

// server.get('/', function (req, res) {
//     res.send("Hello World!");
// });

// var io = require('socket.io').listen(createdServer);

// io.sockets.on('connection', function(socket) {
//     console.log("connected");
//     var redisClient = redis.createClient();
//     redisClient.subscribe('message');
//     redisClient.on("message", function(channel, data) {
//         console.log("new message add in queue " + channel + " channel");
//         socket.emit(channel, data);
//     });

//     socket.on('disconnect', function() {
//         redisClient.quit();
//     });
// });