const express = require('express');
const http = require('node:http');
const path = require('node:path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, "styles")))

let currentColor = '#ffffff';

//6 digit hex generator
function getRandomColor() {
    const rgb = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += rgb[Math.floor(Math.random() * 16)];
    }
    return color;
}

app.get('/', (req, res) => res.render('index'));

io.on('connection', (socket) => {
    //send current theme to newly connected user
    socket.emit('change_color', currentColor);

    //broadcast theme to all users
    socket.on('select_theme', (theme) => {
        if (theme === 'light') currentColor = '#ffffff';
        else if (theme === 'dark') currentColor = '#050505';
        else if (theme === 'random') currentColor = getRandomColor();

        io.emit('change_color', currentColor);
    });
});

server.listen(8000, () => console.log('Listening on port 8000'));
