const express = require("express");

const app = express();

app.set("view engine", "ejs");

const PORT = 8888;

// Global variable for the current color
let color = "#";

// Helper function for randomizing hex colors
function randomColor() {
    const rgb = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
    let color = "#";

    for (let i = 0; i < 6; i++) {
        let x = Math.floor(Math.random()*16);
        color += rgb[x];
    }

    return color;
}

app.get("/", function(req, res) {
    res.render("index");
});

const server = app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});

const io = require("socket.io")(server);

io.on("connection", function(socket) {
    // Check logs to see if everything is connected properly
    console.log("A user has connected");
    socket.emit("message", "Hello from the server!");

    // For updating new users to adopt the current color
    socket.emit("update_color", color);

    // For light mode 
    socket.on("light", function() {
        console.log("Light mode has been selecteed");
        color = "#ffffff";

        // For changing the color for all users
        io.emit("update_color", color);
    });

    // For random mode 
    socket.on("random", function() {
        console.log("Random mode has been selecteed");
        color = randomColor();

        // For changing the color for all users
        io.emit("update_color", color);
    });

    // For dark mode 
    socket.on("dark", function() {
        console.log("Dark mode has been selected");
        color = "#000000";

        // For changing the color for all users
        io.emit("update_color", color);
    });
});