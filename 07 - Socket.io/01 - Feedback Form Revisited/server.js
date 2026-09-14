const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 8000;

// Just to render the main page with the form
app.get("/", function(request, response) {
    response.render("index");
});

const server = app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});

const io = require('socket.io')(server);

// For the socket connection between server and browser
io.on("connection", function(socket) {

    // Checker log to see if it works
    console.log("A client connected");

    // Listerner for the posting_form emit
    socket.on("posting_form", function(data) {
        // Checker log to see output
        console.log(data);

        // For creating and emitting the updated_message
        const message = `You emitted the following values to the server: { name: ${data.name}, course_title: ${data.course}, score: ${data.score}, reason: ${data.reason} }`;
        socket.emit("updated_message", message);

        // For creating and emitting the random_number 
        const random_number = Math.floor(Math.random() * 1000) + 1;
        socket.emit("id_number", random_number);
    });
});