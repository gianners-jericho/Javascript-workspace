/* outline for assignment:
1. Have the server render views/index.ejs that has the form for the user to fill out
2. The user fills out the form and submits
3. The form information is EMITTED to the server with the event name "posting_form"
4. The server listens for an event 'posting_form' and when this event gets triggered, organizes all the emitted information to form a single message and sends this single message with the event called 'updated_message'. It also EMITs an event called 'id_number' with random number between 1-1000.
5. The client listens for an event called 'id_number' and when this event gets triggered, shows the number in the HTML.
6. The client listens for an event called 'updated_message' and when this event gets triggered, displays the message somewhere in the HTML
*/

const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(8000);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));

//render index.ejs file as the default landing page
app.get('/', function(req, res) {
    res.render('index');
});


//process passed data in the server side
io.on('connection', function (socket) {
  
  socket.on('posting_form', function(formData) {
    //prepare the contents to be submitted back to the client to render in the HTML
    const formattedMsg = `You emitted the following values to the server: ${JSON.stringify(formData)}`;

    const randomID = Math.floor(Math.random() * 1000) + 1;

    socket.emit('updated_message', { message: formattedMsg });
    socket.emit('id_number', { id : randomID });
  });
});

//time spent: 40mins