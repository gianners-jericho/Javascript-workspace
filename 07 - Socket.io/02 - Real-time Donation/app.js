const express = require('express');
const path = require('node:path');

const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let money = 0;

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Socket
function emitCurrentMoney(){
    io.emit('money:current', {amount: money});
};

io.on('connection', function (socket) {
    socket.emit('money:current', {amount: money})

    socket.on('money:donate', function (data){
        console.log('received amount', data.amount);
        money += data.amount;
        emitCurrentMoney();
    });

    socket.on('money:redeem', function(data) {
        console.log('deducted amount', data.amount);
        money -= Math.max(data.amount, 0);
        emitCurrentMoney();
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
