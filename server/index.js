var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var moment = require('moment');
let connUsers = {};

io.on('connection', socket => {
    socket.on('disconnect', () => {
        const userData = connUsers[socket.id];
        if (userData) {
            io.to(connUsers[socket.id].room)
                .emit('delete', { user: connUsers[socket.id].username });
            socket.leave(connUsers[socket.id]);
            delete connUsers[socket.id];
        }
    });
    socket.on('get_users', req => {
        let users = [];
        Object.keys(connUsers).forEach(socketId => {
            let userInfo = connUsers[socketId];
            if (userInfo.room.toLowerCase() === req.room.toLowerCase()) {
                users.push(userInfo.username)
            }

        });
        io.to(connUsers[socket.id].room)
            .emit('get_users', { users: users });
    });
    socket.on('join_room', (req, callback) => {
        let nameTaken = false;
        Object.keys(connUsers).forEach(socketId => {
            let userInfo = connUsers[socketId];
            if (userInfo.username.toLowerCase() === req.username.toLowerCase() &&
                userInfo.room.toLowerCase() === req.room.toLowerCase()) {
                nameTaken = true;
            }
        });

        if (!nameTaken) {
            connUsers[socket.id] = req;
            socket.join(req.room);
            callback({
                namaAvailable: true,
            });
        }

    })
    socket.on('chat_message', msg => {
        io.to(connUsers[socket.id].room)
            .emit('message', { msg: msg, username: connUsers[socket.id].username, hours: new Date().getHours(), minutes: new Date().getMinutes() });
    });
});

http.listen(4000, () => {
    console.log('listening on 4000');
});
