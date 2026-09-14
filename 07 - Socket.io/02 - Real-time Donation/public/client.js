/* events client will listen on:
1. update cash - client receives the BROADCASTED updated cash by the server and renders and displays it in the screen.
events client will emit:
1. donate - on the click of the button, the client emits the data sent to the server
2. redeem - same function as donate
*/
const socket = io();


//listen for the update cash
socket.on('update_cash', function(data) {
    document.getElementById('cash-heading').innerText = `Total Cash Donation: $${data.cash}`;

    //display the updated message in the container
    document.getElementById('message-box').style.display = 'block';
    document.getElementById('message-box').innerText = data.message;
});

//emit event listener for when donate button is clicked
document.getElementById('donate-btn').addEventListener('click', function(e) {
    e.preventDefault(); //prevent browser from executing standard page refresh and HTTP GET/POST

    socket.emit('donate');
});

//emit event listener for when redeem button is clicked
document.getElementById('redeem-btn').addEventListener('click', function(e) {
    e.preventDefault(); //prevent browser from executing standard page refresh and HTTP GET/POST

    socket.emit('redeem');
});