const express = require('express');
const session = require('express-session');
const path = require('node:path');

const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);
const port = 3000;

// Static Files

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/results', (req, res) => {
    res.render('results', {})
})

// Socket

io.on('connection', function (socket) {
    console.log("New connection")
    socket.emit('greeting', {msg: "Hello"})

    socket.on('client:hello', function(data){
        console.log(`${data.type} connected.`)
    })

    socket.on('form:submit', function (data){
        console.log(data);
        console.log("emitting form:display with", data)
        io.emit('form:display', {data});
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
