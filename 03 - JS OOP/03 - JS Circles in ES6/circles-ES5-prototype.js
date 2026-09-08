//Circle class in ES5 with Prototype
function Circle(x, y, color){
    //constructor in ES5
    this.diameter = Math.round(Math.random() * (200 - 10 + 1)) + 10; //Compute random diameter between 10px and 200
    this.radius = this.diameter / 2;
    this.x = x; //x coordinate value of the click
    this.y = y; //y coordinate value of the click
    this.timer = null; //timer property to be used for updating size of circle

    //create the element inside the constructor
    this.element = document.createElement("div");
    this.element.className = "circle";
    this.element.style.width = this.diameter + "px";
    this.element.style.height = this.diameter + "px";
    this.element.style.borderRadius = this.radius + "px";
    this.element.style.left = (this.x - this.radius) + "px"; //computation to get the left value
    this.element.style.top = (this.y - this.radius) + "px"; //computation to get the top value
    this.element.style.backgroundColor = color;
    body.appendChild(this.element); //append the element to the body
    this.shrink(); //start shrink when circle is created
}

//create methods inside the prototype of circle
//updateSize(amount) method in this case does the actual reduction of the size of the circle by the given amount.
Circle.prototype.updateSize = function(amount){
    this.diameter = this.diameter - amount;
    if (this.diameter <= 0) {
        clearInterval(this.timer);
        this.element.parentNode.removeChild(this.element);
    } else {
        this.radius = this.diameter / 2;
        this.element.style.width = this.diameter + "px";
        this.element.style.height = this.diameter + "px";
        this.element.style.borderRadius = this.radius + "px";
        this.element.style.left = (this.x - this.radius) + "px";
        this.element.style.top = (this.y - this.radius) + "px";
    };
};

//shrink() method in this case starts and manages the time-based loop (setInterval) to reduce the size of circle.
Circle.prototype.shrink = function(){
    this.timer = setInterval(this.updateSize.bind(this, 1), 20);
}

//Global Javascript file after the circle class in ES5; handling the instance creation of the Circle in HTML
var body = document.getElementById("canvas-body");
var controls = document.getElementById("controls");
var btnGreen = document.getElementById("btn-green");

var currentColor = "#7ff37f";
var currentActiveBox = btnGreen;

// Color mapping object for quick lookup
var colors = {
    "btn-green": "#7ff37f",
    "btn-blue": "#1a7ded",
    "btn-red": "#e53f3f"
};

// one single eventListener (using the id controls) to handle both reset and changing of colors of the circle
controls.addEventListener("click", function(e) {
    e.stopPropagation();

    var targetId = e.target.id;

    // 1. Reset Button Logic
    if (targetId === "btn-reset") {
        var circles = document.getElementsByClassName("circle");
        for (var i = circles.length - 1; i >= 0; i--) {
            body.removeChild(circles[i]);
        }
        return;
    }

    // 2. Color Selection Logic
    if (colors[targetId]) {
        currentColor = colors[targetId];
        currentActiveBox.style.border = "1px solid gray";
        e.target.style.border = "3px solid black";
        currentActiveBox = e.target;
    }
});

// Single listener on body to spawn new OOP circle instances
body.addEventListener("click", function(e) {
    new Circle(e.clientX, e.clientY, currentColor);
});

//time spent: 5mins