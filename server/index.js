var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var connectedUsers = {};

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        var userData = connectedUsers[socket.id];
        if (typeof userData !== 'undefined') {
            socket.leave(connectedUsers[socket.id]);
            delete connectedUsers[socket.id];
        }
    });
    socket.on('join Room', function (req, callback) {
        var nameTaken = false;

        Object.keys(connectedUsers).forEach(function (socketId) {
            var userInfo = connectedUsers[socketId];
            if (userInfo.username.toUpperCase() === req.username.toUpperCase() && userInfo.room.toUpperCase() === req.room.toUpperCase()) {
                nameTaken = true;
            }
        });

        if (!nameTaken) {
            connectedUsers[socket.id] = req;
            console.log("joined");
            socket.join(req.room);
            callback({
                namaAvailable: true,
                username: 'System',
                msg: req.username + ' has join the room'
            });
        } else {
            callback({ namaAvailable: false })
        }


    })
    socket.on('chat message', function (msg) {
        console.log("ioioio")
        io.to(connectedUsers[socket.id].room).emit('message', { msg: msg, username: connectedUsers[socket.id].username });
    });
});

http.listen(4000, function () {
    console.log('listening on *3000');
});
