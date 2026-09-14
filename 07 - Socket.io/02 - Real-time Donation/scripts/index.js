const socket = io();

const totalCash = document.getElementById("total-cash");
const lastUser = document.getElementById("last-user");

socket.on("update_cash", function(data){
    totalCash.textContent = `Cash: ${data.cash}`;
    totalCash.style.display = 'block';

    if(data.message){
        lastUser.textContent = data.message;
        lastUser.style.display = 'block';
    }
})