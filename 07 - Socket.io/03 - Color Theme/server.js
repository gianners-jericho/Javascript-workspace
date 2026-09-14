/* outline for this assignment:
1. render the index.ejs view alongside the 3 buttons present in that page.
2. user clicks a button to change the background of the page to that color.
3. update the view such that the server BROADCASTS the updated background color to all connected clients
4. when a new user connects to the server, update the color of the user's page to the most recent color previously selected by the last user.

events the server will listen on:
1. light-mode button - change the background of the page to white for all connected clients
2. dark-mode button - change the background of the page to black for all connected clients
3. random-mode button - change the background of the page to a random color for all connected clients

events the server will emit:
1. io.emit('update_color', data) - BROADCAST the updated color to all connected clients
2. socket.emit('color', recent_color) - emit the latest color to the newly connected client.
*/

const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(7777);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));

function getRandomColor() {
    const rgb = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
    let color = '#'  //this is what we'll return!
    for(let i = 0; i < 6; i++)   // 6 is total number of characters in hex
    {
        let x = Math.floor((Math.random()*16));  // 16 for hex
        color += rgb[x]; 
    }

    return color;
};

let currentColor = '#FFFFFF';
//render index.ejs file as the default landing page
app.get('/', function(req, res) {
    res.render('index');
});

io.on('connection', function (socket) {
    //emit active state to newly connected user
    socket.emit('update_color', { color: currentColor });

    //event listener for the 3 buttons
    socket.on('set_light', function() {
        currentColor = '#FFFFFF';
        //emit the update; BROADCAST TO ALL CONNECTED CLIENTS
        io.emit('update_color', { color: currentColor });
    });

    socket.on('set_dark', function() {
        currentColor = '#333738';
        //emit the update; BROADCAST TO ALL CONNECTED CLIENTS
        io.emit('update_color', { color: currentColor });
    });

    socket.on('set_random', function() {
        currentColor = getRandomColor();
        //emit the update; BROADCAST TO ALL CONNECTED CLIENTS
        io.emit('update_color', { color: currentColor });
    });
});


//time spent: 20mins