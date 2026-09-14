/* Outline for this assignment:
1. render default index.ejs file where user is prompted to enter their name
2. user enters their name and submits it to the server
3. NOTE: if the user has not filled out the name before, have a javascript prompt asking their name
4. server stores the user's name (maybe a session???)
5. render the chat.ejs file where its a chatroom for all the connected users where they can talk and guess the word being prompted
6. user enters a message in the chat room, which is sent to the server
7. server BROADCASTS the message to every user connected to that chatroom.
8. user enters a guess word for the prompt.
9. server receives the word; if its correct, server sends a message to the chat room about which user won, and what the word was.
10. if its not correct, check for the letters and see which letters are right
11. server then BROADCASTS the right letters to the prompt/word being guessed. 
12. The chatboard should update in real tiem and even show all the chats that occurred before the user joined the room.

events the server will listen on:
1. socket.emit('got_new_user, { name: name }) - receive the new user and redirect to the chat room.
2. socket.emit('send_message', { message: text }) - message sent by user to the chat room.

events the server will emit:
1. io.emit('update_chat', data) - BROADCAST to the chat whenever a guess or message is sent.
2. socket.emit('init_game', data) - send to the newly connected user the prompt being guessed.
*/

const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(7076);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));

function getWordDisplay() {
    return targetWord
        .split('')
        .map((letter, index) => (revealedIndices.includes(index) ? letter : '_'))
        .join(' ');
}

let targetWord = "socket";
let revealedIndices = [0, 4]; // Indexes for 's' and 'e' -> "s _ _ _ e _"
let chatHistory = [];

//render index.ejs file as the default landing page
app.get('/', function(req, res) {
    res.render('index');
});

io.on('connection', function (socket) {
    //emit on new user connecting
    socket.on('got_new_user', function(data) {
        socket.name = data.name || 'Anonymous';

        //send initial game state and existing history ONLY to the new user
        socket.emit('init_game', {
            wordDisplay: getWordDisplay(),
            chatHistory: chatHistory
        });
    })

    //emit the message being sent
    socket.on('send_message', function(data) {
        const guess = data.message.trim().toLowerCase();
        const user = socket.name || 'Anonymous';

        //check for exact winning guess
        if (guess === targetWord){
            //reveal all the letters
            revealedIndices = targetWord.split('').map((_, i) => i);

            const win_message = `${user} won! "${targetWord}" is the exact word!`;
            chatHistory.push({ user: 'System', message: win_message, isSystem: true, systemMessage: win_message });

            io.emit('update_chat', {
                user: user,
                message: guess,
                systemMessage: win_message,
                isSystem: true,
                wordDisplay: getWordDisplay(),
                chatHistory: chatHistory
            });
            return;
        }

        //check for partial letter matches
        for (let i = 0; i < guess.length; i++){
            if(guess[i] === targetWord[i] && !revealedIndices.includes(i)) {
                revealedIndices.push(i);
            }
        }

        //store and broadcast regular chat message
        chatHistory.push({
            user: user,
            message: guess,
            isSystem: false
        });

        io.emit('update_chat', {
            user: user,
            message: guess,
            wordDisplay: getWordDisplay(),
            chatHistory: chatHistory
        });
    });
});

//time spent: 30mins