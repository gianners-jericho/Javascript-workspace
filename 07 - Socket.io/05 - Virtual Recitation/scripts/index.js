//initialize socket connection
const socket = io();

//get dom elements
const raiseHandBtn = document.getElementById('raise-hand-btn');
const logBox = document.getElementById('log-box');

//append message to log box
function appendLog(message) {
    const p = document.createElement('p');
    p.textContent = message;
    p.style.margin = '0';
    logBox.appendChild(p);
    logBox.scrollTop = logBox.scrollHeight;
}

//listen for log events from server
socket.on('log', function(message) {
    appendLog(message);
});

//listen for raise hand click
raiseHandBtn.addEventListener('click', function() {
    socket.emit('raise_hand');
});
