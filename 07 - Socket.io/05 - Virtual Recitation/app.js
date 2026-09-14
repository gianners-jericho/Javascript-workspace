//import dependencies
const express = require('express');
const http = require('node:http');
const path = require('node:path');
const socketIO = require('socket.io');

const PORT = 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

//render single view
app.get('/', function(request, response) {
    response.render('index');
});

//listen for socket connections
io.on('connection', function(socket) {
    //notify user of own presence
    socket.emit('log', `Socket ID ${socket.id} is present.`);

    //notify everyone else of arrival
    socket.broadcast.emit('log', `Socket ID ${socket.id} is present..`);

    //listen for raise hand event
    socket.on('raise_hand', function() {
        //broadcast raise hand to all other users
        socket.broadcast.emit('log', `Socket ID ${socket.id} raised hand!`);
    });

    //listen for disconnect event
    socket.on('disconnect', function() {
        //broadcast departure to remaining users
        socket.broadcast.emit('log', `Socket ID ${socket.id} left.`);
    });
});

//start server
server.listen(PORT, function() {
    console.log(`listening on port ${PORT}`);
});
