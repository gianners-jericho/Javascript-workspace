const express = require('express');
const http = require('node:http');
const path = require('node:path');
const socketIO = require('socket.io');

const PORT = 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

//array of objects containing the full word and hidden word with clues
const wordBank = [
    { word: 'javascript', clue: 'j _ v _ s _ r _ p t'},
    { word: 'elephant', clue: 'e _ e _ _ a n _' },
    { word: 'socket', clue: 's _ c _ e _' },
    { word: 'guitar', clue: 'g _ _ t _ r' },
    { word: 'pizza', clue: 'p _ _ z _' },
    { word: 'philippines', clue: 'p _ i _ i _ p _ n e s' }
];

function getRandomWordItem() {
    return wordBank[Math.floor(Math.random() * wordBank.length)];
}

//randomly select word
let currentWordItem = getRandomWordItem();

//store chat history in memory for newly joined users
const messages = [];

app.get('/', (req, res) => res.render('index'));

io.on('connection', (socket) => {
    //listen for new users
    socket.on('new_user', (name) => {
        socket.name = name;

        //send all previous messages to newly joined user
        socket.emit('load_history', messages);

        //send hidden word to new user
        socket.emit('update_clue', currentWordItem.clue);

        //announce new user join
        const joinMsg = { name: 'System', text: `${name} has joined the game!` };
        messages.push(joinMsg);
        io.emit('new_message', joinMsg);
    });

    //listen for chats and guesses
    socket.on('send_message', (text) => {
        if (!text || !text.trim()) return;
        const trimmed = text.trim();

        //broadcast user chat
        const msg = { name: socket.name || 'Anonymous', text: trimmed };
        messages.push(msg);
        io.emit('new_message', msg);

        //check if user gussed the word
        if (trimmed.toLowerCase() === currentWordItem.word.toLowerCase()) {
            const winMsg = { 
                name: 'System', 
                text: `${socket.name} guessed the word correctly! It was "${currentWordItem.word}".`,
                isWin: true
            };
            messages.push(winMsg);
            io.emit('new_message', winMsg);

            //randomly select a new word then broadcast to everyone
            currentWordItem = getRandomWordItem();
            io.emit('update_clue', currentWordItem.clue);
        }
    });
});

server.listen(PORT, function() {
    console.log(`LISTENING ON PORT ${PORT}`);
});
