const express = require("express");

const app = express();

app.set("view engine", "ejs");

const PORT = 8888;

let amount = 0;

app.get("/", function(req, res) {
    res.render("index", { amount: amount });
});

const server = app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});

const io = require('socket.io')(server);

io.on("connection", function(socket) {
    console.log("A user has connected");

    socket.emit("message", "Hello from the server!");

    socket.on("donate_money", function() {
        console.log("Money has been donated!");
        amount += 10;

        io.emit("updated_amount", amount);
    });

    socket.on("redeem_money", function() {
        console.log("Money has been redeemed!");
        amount -= 10;
        io.emit("updated_amount", amount);
    });
});
