const socket = io();

//client side processing of data
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault(); //prevent browser from executing standard page refresh and HTTP GET/POST

    //build the formData to be passed to the server side
    const formData = {
        name : document.getElementById('name').value,
        course : document.getElementById('course').value,
        score : document.getElementById('score').value,
        reason: document.getElementById('reason').value
    }
    socket.emit('posting_form', formData);
});

//when the server side passes the data to be rendered after submission, display the updated message
socket.on('updated_message', function(data) {
    const response_container = document.getElementById('response-container');
    const updated_message = document.getElementById('updated-message');
    response_container.style.display = 'block';
    updated_message.innerText = data.message;
});

//same goes for random ID number
socket.on('id_number', function(data) {
    const id_number = document.getElementById('id-number');
    id_number.innerText = `Random generated id number is ${data.id}.`;
});