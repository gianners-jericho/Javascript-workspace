const express = require('express');
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const PORT = 1337

const server = app.listen(PORT);
const io = require('socket.io')(server);


//Reads the POST body from the form and puts it into request.body
app.use(express.urlencoded({
    extended: true
}));

const courses = ["JavaScript", "Java", "Python"];

//FORM ROUTE
app.get("/", function(request, response) {

    response.render('index.ejs', {courses: courses});
})


//RESULT ROUTE
app.get("/result", function(request, response) {
    response.redirect("/");
})

//The form information is EMITTED to the server with the event name "posting_form"
io.on('connection', function (socket) {
    socket.on('posting_form', function (data) {
        socket.emit('updated_message', {msg: `You emitted the following values to the server: ${JSON.stringify(data, null, 2)}`});

        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        socket.emit('id_number', {msg: `Random generated id number is ${randomNumber}`});
    });
})

//SERVER PORT
app.listen(PORT, function () {
    console.log(`Listening to port ${PORT}`); 
});
