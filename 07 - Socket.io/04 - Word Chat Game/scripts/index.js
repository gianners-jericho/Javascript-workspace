const socket = io();

//prompt user name
const userName = prompt("What is your name?") || "Anonymous";

const wordClue = document.getElementById("word-clue");
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");

function appendMessage(msg) {
    const p = document.createElement("p");
    p.textContent = `${msg.name}: ${msg.text}`;
    p.style.margin = "0";
    if (msg.isWin) p.style.color = "green";
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}

//tell server new user joined
socket.emit("new_user", userName);

//receive and display new hidden word
socket.on("update_clue", function(clue) {
    wordClue.textContent = clue;
});

//receive all past chats
socket.on("load_history", function(messages) {
    chatBox.innerHTML = "";
    messages.forEach(function(msg) {
        appendMessage(msg);
    });
});

//receive new real time messages
socket.on("new_message", function(msg) {
    appendMessage(msg);
});

//send chat/guess on form submit
chatForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const text = messageInput.value.trim();
    if (text) {
        socket.emit("send_message", text);
        messageInput.value = "";
    }
});
