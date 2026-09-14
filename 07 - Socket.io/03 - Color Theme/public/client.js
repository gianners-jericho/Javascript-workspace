/* events client will listen on:
1. update color - client receives the BROADCASTED updated color by the server and renders and displays it in the screen.
2. update color (For new connected client) - update the color of the page for the newly connected user/s
events client will emit:
1. light-mode button - change the background of the page to white for all connected clients
2. dark-mode button - change the background of the page to black for all connected clients
3. random-mode button - change the background of the page to a random color for all connected clients
*/

const socket = io();

//listen for the updated color sent by the server (BOTH ON CONNECTION AND CLICK EVENTS)
socket.on('update_color', function(data) {
    document.body.style.backgroundColor = data.color;
});

//click event handlers to send to the server
document.getElementById('light-btn').addEventListener('click', function() {
    socket.emit('set_light');
});

document.getElementById('dark-btn').addEventListener('click', function() {
    socket.emit('set_dark');
});

document.getElementById('random-btn').addEventListener('click', function() {
    socket.emit('set_random');
});