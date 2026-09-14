const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

const PORT = 8000;

app.get("/", function(req, res) {
    res.render("index");
});

const server = app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});

const io = require("socket.io")(server);

const word = "claude code";

const chatHistory = [];

let winner = null;

io.on("connection", function(socket) {
    console.log("A user has connected!");
    socket.emit("message", "Hello from the server!");

    // Adding a user
    socket.on("join", function(name) {
        socket.username = name;

        // Shows chat_history as they join
        socket.emit("chat_history", chatHistory);
    });

    // Submitted message or quess
    socket.on("chat_message", function (text) {

        // To lock out any possible invalid access
        if (!socket.username) {
            return;
        }

        const message = { name: socket.username, text: text };
        chatHistory.push(message);

        // Sent message to everyone who is connected
        io.emit("chat_message", message);

        // Checking if the guess is correct and triggers a congratulations if ever right
        const isCorrect = text.trim().toLowerCase() === word.toLocaleLowerCase();
        if (isCorrect && !winner) {
            winner = socket.username;

            const congratulations = {
                system: true, 
                text: `${winner} won! "${word}" is the exact word!`
            };
            chatHistory.push(congratulations);
            io.emit("chat_message", congratulations);
        }
    });
});