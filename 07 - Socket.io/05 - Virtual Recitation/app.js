const express = require('express');
const path = require('node:path');

const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);
const port = 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Socket
function emitPresent(id){
    io.emit("user:entered", {data: id});
}

function emitRaise(id){
    io.emit("user:raised", {data:id});
}

function emitLeave(id){
    io.emit("user:left", {data:id});
}

io.on('connection', function (socket) {
    emitPresent(socket.id);


    socket.on("user:raise", function(){
        emitRaise(socket.id)
    });

    socket.on('disconnect', function(){
        emitLeave(socket.id)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
