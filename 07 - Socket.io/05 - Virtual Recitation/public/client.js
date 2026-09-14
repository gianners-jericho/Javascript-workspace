const socket = io();

const raiseBtn = document.getElementById('raise-btn');
const logContainer = document.getElementById('log-container');

//emit raise hand action
raiseBtn.addEventListener('click', function() {
    socket.emit('raise_hand');
});

//listen for notifications broadcast by the server
socket.on('notification', function(data) {
    const p = document.createElement('p');

    //format the message
    p.innerHTML = `Socket ID <span class="socket-id">${data.id}</span> ${data.action}`;
    
    logContainer.appendChild(p);
});