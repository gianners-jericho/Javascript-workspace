const express = require('express');
const http = require('node:http');
const path = require('node:path');
const socket = require("socket.io");

const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));

let totalCash = 100;

app.get(["/", "/index"], function(request, response){
    response.render("index");
})

function broadcastCashUpdate(message){

    io.emit("update_cash", {cash: totalCash, message})
}

io.on("connection", function(socket){
    console.log(`Client connected: ${socket.id}`);

    socket.emit("update_cash", {cash: totalCash})

    socket.on("redeem_10", function(){
        totalCash -= 10;
        const message = `${socket.id} redeemed $10 from the total cash!`
        broadcastCashUpdate(message)
    });

    socket.on("donate_10", function(){
        totalCash += 10;
        const message = `${socket.id} donated $10 to the total cash!`
        broadcastCashUpdate(message)
    });
})


server.listen(PORT, function(){
    console.log(`LISTENING ON PORT: ${PORT}`)
})

