const express = require('express');
const path = require('node:path');

const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);
const port = 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let color = "#FFFFFF";

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Socket

function randomColorHex() {
    const rgb = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
    let color = '#'  //this is what we'll return!
    for(let i = 0; i < 6; i++)   // 6 is total number of characters in hex
    {
        let x = Math.floor((Math.random()*16));  // 16 for hex
        color += rgb[x]; 
    }

    return color;
}

function emitColor() {
    io.emit('color:current', {color: color})
}

io.on('connection', function (socket) {
    socket.emit('color:current', {color: color})

    socket.on('color:random', function (data){
        console.log('color random')
        color = randomColorHex();
        emitColor();
    })

    socket.on('color:light', function(data){
        console.log('set light');
        color = '#FFFFFF';
        emitColor();
    })

    socket.on('color:dark', function(data) {
        console.log('set dark');
        color = '#333333';
        emitColor();
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
