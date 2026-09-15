const express = require('express');
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const PORT = 8000
const server = app.listen(PORT, function () {
    console.log(`Listening to port ${PORT}`); 
});
const io = require('socket.io')(server);

app.get("/", function (request, response) {
    response.render('index');
})

var balance = 0;

// Listener: runs when a browser connects to Socket.IO.
io.on('connection', function (socket) {
    // Listener: waits for a button action from this browser.
    socket.on('btnPushed', function (action) {
        if (action === 'update') {
            balance += 10;
        }

        if (action === 'redeem') {
            balance -= 10;
        }

        // Emitter: sends the updated balance to every connected browser.
        io.emit('update', {total: balance});
    });
});