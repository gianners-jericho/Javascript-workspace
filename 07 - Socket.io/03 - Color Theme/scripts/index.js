const socket = io();

function setTheme(mode) {
    socket.emit('select_theme', mode);
}

socket.on('change_color', function(color) {
    document.body.style.backgroundColor = color;
});
