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

var currentColor = 'ffffff';

// Listener: runs when a browser connects to Socket.IO.
io.on('connection', function (socket) {
    // Emitter: sends the most recently selected color to the new browser.
    socket.emit('update', {color: currentColor});

    // Listener: waits for a button action from this browser.
    socket.on('btnPushed', function (action) {
        if (action === 'light') {
            currentColor = 'ffffff';
        }
        if (action === 'dark') {
            currentColor = '000000';
        }
        if (action === 'random') {
            const rgb = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
            currentColor = '';

            for(let i = 0; i < 6; i++)
            {
                let x = Math.floor((Math.random()*16));
                currentColor += rgb[x]; 
            }
        }

        // Emitter: sends the updated color to every connected browser.
        io.emit('update', {color: currentColor});
    });
});