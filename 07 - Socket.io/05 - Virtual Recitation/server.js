/*outline for this assignment:
1. new user connects to the Server (i.e. zoom session/google meet)
2. every user present in the server gets notified of the person's arrival with the following message: "Socket ID MV72_Ja_oKBrFlqyAAAG is present.."
3. user clicks the raise hand button
4. every user present in the server gets notified with "Socket ID MV72_Ja_oKBrFlqyAAAG raised hand!"
5. user leaves the server
6. everyone in the server gets notified with "Socket ID MV72_Ja_oKBrFlqyAAAG left."
*/

const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(7076);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));

//render index.ejs file as the default landing page
app.get('/', function(req, res) {
    res.render('index');
});

io.on('connection', function(socket) {
    //emit BROADCAST of a new user connecting
    io.emit('notification', {
        id: socket.id,
        action: 'is present.'
    });

    //listen for raise hand event
    socket.on('raise_hand', function() {
        io.emit('notification', {
            id: socket.id,
            action: 'raised hand!'
        });
    });

    //listen for disconnect 
    socket.on('disconnect', function() {
        io.emit('notification', { 
            id: socket.id, 
            action: 'left.' 
        });
    });
});

//time spent: 10mins