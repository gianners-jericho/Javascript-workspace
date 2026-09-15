const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const PORT = 8000;

//SERVER
const server = app.listen(PORT, function () {
    console.log(`Listening to port ${PORT}`);
});

const io = require('socket.io')(server);

//ROOT ROUTE
app.get('/', function (request, response) {
    response.render('index');
});

// Listener: runs when a browser connects to Socket.IO.
io.on('connection', function (socket) {
    console.log(socket.id);

    //Emitter: tell all other users that this user is present.
    socket.broadcast.emit('update', {
        message: `Socket ID ${socket.id} is present.`
    });

    //Listener: waits for the raise hand button from this user.
    socket.on('raiseHand', function () {
        //Emitter: tell all other users that this user raised their hand.
        socket.broadcast.emit('update', {
            message: `Socket ID ${socket.id} raised hand!`
        });
    });

    //Listener: runs when this user leaves the server.
    socket.on('disconnect', function () {
        //Emitter: tell all other users that this user left.
        socket.broadcast.emit('update', {
            message: `Socket ID ${socket.id} left.`
        });
    });
});
