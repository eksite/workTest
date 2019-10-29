var socket = io();

function Submit(e) {
    e.preventDefault();
    socket.emit('chat message', document.getElementById('message').val())
    document.getElementById('message').val('');
    return false;

}

socket.on('message', function (msg) {
    console.log("ewq");
});
