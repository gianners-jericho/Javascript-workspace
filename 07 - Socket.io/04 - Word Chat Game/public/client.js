/*events the client will emit:
1. socket.emit('got_new_user, { name: name }) - receive the new user and redirect to the chat room.
2. socket.emit('send_message', { message: text }) - message sent by user to the chat room.

events the client will listen on:
1. ('update_chat', data) - BROADCAST to the chat whenever a guess or message is sent.
2. 'init_game', data) - send to the newly connected user the prompt being guessed.
*/

const socket = io();

//DOM Elements
const wordDisplay = document.getElementById('word-display');
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

// Prompt for name on load
const userName = prompt("Enter your name:") || "Anonymous";
socket.emit('got_new_user', { name: userName });

//send message event handler
chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = messageInput.value.trim();
    if(text !== '') {
        socket.emit('send_message', { message: text });
        messageInput.value = '';
    }
});

// Receive initial state on join
socket.on('init_game', function(data) {
    updateWordDisplay(data.wordDisplay);
    renderChatHistory(data.chatHistory);
});

// Receive live updates broadcast to all clients
socket.on('update_chat', function(data) {
    updateWordDisplay(data.wordDisplay);
    appendChatMessage(data);
});

// Helper Functions
function updateWordDisplay(text) {
    wordDisplay.innerText = text;
}

function renderChatHistory(history) {
    chatBox.innerHTML = '';
    history.forEach(function(item) {
        appendChatMessage(item);
    });
}

function appendChatMessage(data) {
    const p = document.createElement('p');
    if (data.isSystem) {
        p.style.color = 'green';
        p.style.fontWeight = 'bold';
        p.style.fontStyle = 'italic';
        p.innerText = data.systemMessage || data.message;
    } else {
        p.innerText = `${data.user}: ${data.message}`;
    }
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}