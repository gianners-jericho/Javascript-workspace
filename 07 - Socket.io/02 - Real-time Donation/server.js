/* outline for this assignment:
1. Render the views/index.ejs file for the donation page
2. user pushes the donate $10 button to increase the cash donation by 10
3. update the contents of the cash donation inside the container to BROADCAST(EMIT) the update made to the total cash donation
4. user pushes the redeem $10 button to decrease the cash donation
5. update the content the same way we did for BROADCASTING the increment change
6. include messages on BOTH EMITS

HINT: usde a variable on the serve side to keep track of how much cash is remaining.
HINT: Think about the events the client will need to listen for and the events the serverr must listen for.
      Map out the emitters and listeners you will need before coding.

events server will listen on:
1. donation - add 10 to the total cash
2. redeem - subtract 10 to the total cash

events server will emit:
1. io.emit('update_cash', data) - to broadcast the new balance to every client connected/every open browser simultaneously.
*/

const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(8888);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));

let totalCash = 100; //starting total donation
//render index.ejs file as the default landing page
app.get('/', function(req, res) {
    res.render('index');
});

//process the data passed by the client
io.on('connection', function (socket) {
    //emitting the current live balance
    socket.emit('update_cash', {
        cash: totalCash,
        message: 'Connected to donation drive.'
    });

    //listen for the donate event
    socket.on('donate', function() {
        totalCash += 10; //increment by 10
        
        //now we broadcast it to all connected clients
        io.emit('update_cash', {
            cash: totalCash,
            message: 'Someone donated $10!'
        });
    });


    //listen for the redeem event
    socket.on('redeem', function() {
        totalCash -= 10; //decrement by 10
        
        //now we broadcast it to all connected clients
        io.emit('update_cash', {
            cash: totalCash,
            message: 'Someone redeemed $10!'
        });
    });
});

//time spent: 20mins