const express = require('express');
const path = require('node:path');
const http = require('node:http');
const socket = require('socket.io')

const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = socket(server); 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))


app.use(express.urlencoded({extended: true}));
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));

app.get(["/","/index"], function(request, response){
    response.render('index')
});

io.on("connection", function(socket){
    console.log(`Client connected: ${socket.id}`);

    //listen for posting form event
    socket.on("posting_form", function(data){
        const {name, course_title, score, reason} = data;

        const updatedMessage = `You emitted the following information to the server:\n` +
            `Name: ${name}\n` +
            `Course: ${course_title}\n` +
            `Score: ${score}\n` +
            `Reason: ${reason}`;

        const randomNumber = Math.floor(Math.random() * 1000) + 1;

        socket.emit('updated_message', { message: updatedMessage });
        socket.emit('id_number', { number: randomNumber });
    })
})

server.listen(PORT, function(){
    console.log(`LISTENING ON PORT ${PORT}`);
})
