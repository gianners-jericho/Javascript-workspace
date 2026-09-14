const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

const PORT = 8000;

app.get("/", function (req, res) {
    res.render("index");
});

const server = app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});

const io = require("socket.io")(server);

io.on("connection", function (socket) {
    console.log(socket.id);

    // socket.broadcast.emit sends to every other connected socket but just not yourself
    socket.broadcast.emit("notification", `Socket ID <b>${socket.id}</b> is present.`);

    // Fired when this user clicks the "Raise Hand" button.
    socket.on("raise hand", function () {
        socket.broadcast.emit("notification", `Socket ID <b>${socket.id}</b> raised hand!`);
    });

    socket.on("disconnect", function () {
        socket.broadcast.emit("notification", `Socket ID <b>${socket.id}</b> left.`);
    });
});