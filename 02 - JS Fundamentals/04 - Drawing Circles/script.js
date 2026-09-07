var body = document.getElementById("canvas-body");
var btnGreen = document.getElementById("btn-green");
var btnBlue = document.getElementById("btn-blue");
var btnRed = document.getElementById("btn-red");
var btnReset = document.getElementById("btn-reset");

var currentColor = "#CCE8CC"; 
var currentActiveBox = btnGreen;

function changeColor(hexColor, element) {
    currentColor = hexColor;
    currentActiveBox.style.border = "1px solid gray";
    element.style.border = "3px solid black";
    currentActiveBox = element;
}

btnGreen.addEventListener("click", function(e) {
    e.stopPropagation();
    changeColor("#CCE8CC", btnGreen);
});

btnBlue.addEventListener("click", function(e) {
    e.stopPropagation();
    changeColor("#CCE8EC", btnBlue);
});

btnRed.addEventListener("click", function(e) {
    e.stopPropagation();
    changeColor("#ECCECE", btnRed);
});


btnReset.addEventListener("click", function(e) {
    e.stopPropagation();
    var circles = document.getElementsByClassName("circle");

    for (var i = circles.length - 1; i >= 0; i--) {
        body.removeChild(circles[i]);
    }
});

body.addEventListener("click", function(e) {
    var diameter = Math.round(Math.random() * (200 - 10 + 1)) + 10;
    var radius = diameter / 2;

    var xPosition = e.clientX - radius;
    var yPosition = e.clientY - radius;

    var newCircle = document.createElement("div");
    newCircle.className = "circle";
    newCircle.style.width = diameter + "px";
    newCircle.style.height = diameter + "px";
    newCircle.style.borderRadius = radius + "px";
    newCircle.style.left = xPosition + "px";
    newCircle.style.top = yPosition + "px";
    
    newCircle.style.backgroundColor = currentColor; 

    body.appendChild(newCircle);

    var currentDiameter = diameter;

    var shrinkTimer = setInterval(function() {
        currentDiameter = currentDiameter - 1; 
        var newRadius = currentDiameter / 2;

        if (currentDiameter <= 0) {
            clearInterval(shrinkTimer); 
            body.removeChild(newCircle); 
        } else {
            newCircle.style.width = currentDiameter + "px";
            newCircle.style.height = currentDiameter + "px";
            newCircle.style.borderRadius = newRadius + "px";
            
            newCircle.style.left = (e.clientX - newRadius) + "px";
            newCircle.style.top = (e.clientY - newRadius) + "px";
        }
    }, 20);
});

//time spent: 10mins