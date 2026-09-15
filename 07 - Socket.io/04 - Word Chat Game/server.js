const express = require('express');
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const PORT = 8000
//SERVER
const server = app.listen(PORT, function () {
    console.log(`Listening to port ${PORT}`); 
});
const io = require('socket.io')(server);

//ROOT ROUTE
app.get("/", function (request, response) {
    response.render('index');
});

const guesses = [];

// Listener: runs when a browser connects to Socket.IO.
io.on('connection', function (socket) {

    socket.emit('update', {list: guesses});

    //Listener: wait for the name from client
    socket.on('submitName', function (name) {
        socket.name = name;
    })
    //Listener: wait for the guess word from client
    socket.on('submitBtn', function (data) {
        if (data === '') {
            return;
        }

        guesses.push({
            name: socket.name,
            guess: data
        })
        //Emitter: send the data to the client
        io.emit('update', {list: guesses});
    });
});