// Node server which will handle socket io
var io = require('socket.io')(8080)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', NAME =>{
        console.log("New User", NAME);
        users[socket.id] = NAME;
        socket.broadcast.emit('user-joined', NAME);


    });
    socket.on('Send', message => {
        socket.broadcast.emit('receive', {message: message, NAME: users[socket.id] })
    });


socket.on('disconnect', message => {
    socket.broadcast.emit('Left', users[socket.id] )
    delete users[socket.id];
});
});