const express = require('express');
const path = require('node:path');

const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Game Variables
let currentWord = "";
let maskedWord = "";

// {name: string, content: string, timestamp: timestamp}[]
let chats = [];

// {name: string, score: number}
let scores = [];

const words = [
  "Kangaroo",
  "Elephant",
  "Umbrella",
  "Bicycle",
  "Volcano",
  "Penguin",
  "Mountain",
  "Guitar",
  "Dolphin",
  "Blanket",
  "Firefly",
  "Sandwich",
  "Telescope",
  "Butterfly",
  "Chimney",
  "Lantern",
  "Compass",
  "Whisper",
  "Marble",
  "Pyramid"
];

gameInit();

// Logic
function gameInit(){
    const randomWord = getRandomWord();
    currentWord = randomWord;
    maskedWord = maskWord(randomWord);
};

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
};

function correctGuess(name){
    // announce correct
    const chat = {name: "System", content: `${name} guessed the word!`, timestamp: Date.now()};
    chats.push(chat);
    emitNewChat(chat.name, chat.content, chat.timestamp);

    // update scores
    let nameIndex = null;
    for(let i = 0; i < scores.length; i++){
        if(scores[i].name == name) {
            nameIndex = i;
            break;
        };
    };

    if(nameIndex > -1){
        scores[nameIndex].score++;
        emitScores();
    };

    // Get new word
    let chosenWord = getRandomWord();
    currentWord = chosenWord;
    maskedWord = maskWord(chosenWord);
    emitWord();
}

function maskWord(word, revealCount = 3) {
    const letters = word.split("");
 
    // Positions of real letters (ignore spaces)
    const letterPositions = [];
    for (let i = 0; i < letters.length; i++) {
        if (letters[i] !== " ") letterPositions.push(i);
    }
 
    // Shuffle and pick which to reveal
    const shuffledPositions = shuffleArray(letterPositions);
    const positionsToReveal = new Set(shuffledPositions.slice(0, revealCount));
 
    return letters
        .map((letter, index) => {
            if (letter === " " || positionsToReveal.has(index)) return letter;
            return "_";
        })
        .join("");
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled;
}


// Socket Ons and Emissions
function emitNewChat(name, content, timestamp){
    io.emit("chat:update", {name: name, content: content, timestamp: timestamp});
}

function emitScores(){
    io.emit("scores:update", {scores: scores});
}

function emitWord(){
    io.emit("word:update", {word: maskedWord});
}

io.on('connection', function (socket) {
    socket.emit('game:init', {scores: scores, chats: chats, word: maskedWord});

    socket.on('player:start', function (data){
        console.log('player joined', data.name);
        const chat = {name: "System", content: `${data.name} joined the game.`, timestamp: Date.now()}
        chats.push(chat);
        emitNewChat(chat.name, chat.content, chat.timestamp);

        scores.push({name: data.name, score: 0});
        emitScores();
    });

    socket.on('chat:create', function(data) {
        const {name, content, timestamp} = data;
        const chat = {name, content, timestamp}
        chats.push(chat);
        emitNewChat(name, content, timestamp);

        if(String(content).toLowerCase().includes(currentWord.toLowerCase())){
            console.log(content, currentWord);
            correctGuess(name);
        }
    });
});