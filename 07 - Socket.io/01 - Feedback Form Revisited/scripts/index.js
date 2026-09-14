const socket = io(); //this line is what initiates the persistent socket connection to the server
//it takes the address and port from the browser and initiates the connection to the port e.g. (localhost:8000)

const form = document.getElementById('feedback-form');
const idDisplay = document.getElementById('id-display');
const messageDisplay = document.getElementById('message-display');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        course_title: document.getElementById('course_title').value,
        score: document.getElementById('score').value,
        reason: document.getElementById('reason').value,
    };

    socket.emit("posting_form", formData);
});

//listen for id_number event emitted by the server
socket.on("id_number", function(data){
    idDisplay.textContent = `Your lucky number emitted by the server is: ${data.number}`; //add text content to idDisplay elem
    idDisplay.style.display = 'block'; //change display mode to block so it appears
});

socket.on("updated_message", function(data){
    messageDisplay.textContent = data.message;
    messageDisplay.style.display = 'block';
});