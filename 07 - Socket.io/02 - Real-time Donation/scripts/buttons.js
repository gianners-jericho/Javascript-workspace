//do not redeclare socket variable since it is already declared in index.js and it was imported in index.ejs before this file

const donateButton = document.getElementById("donate-button");
const redeemButton = document.getElementById("redeem-button");

donateButton.addEventListener("click", function(){
    socket.emit("donate_10");
})

redeemButton.addEventListener("click", function(){
    socket.emit("redeem_10");
})