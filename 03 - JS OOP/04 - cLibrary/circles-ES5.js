// ES5 Version of Clib
// 1. INDIVIDUAL CIRCLE class in ES5  (kept circle object but only internal use)
function Circle(x, y, container) {
    //constructor in ES5
    this.diameter = Math.round(Math.random() * (200 - 10 + 1)) + 10; //Compute random diameter between 10px and 200
    this.radius = this.diameter / 2;
    this.x = x; //x coordinate value of the click
    this.y = y; //y coordinate value of the click
    this.timer = null; //timer property to be used for updating size of circle

    // Get container bounds for proper offset calculation
    var rect = container.getBoundingClientRect();
    var relativeX = this.x - rect.left;
    var relativeY = this.y - rect.top;

    // Random colors for dynamic variety across the batch
    var randomColors = ["#7ff37f", "#1a7ded", "#e53f3f", "#f59e0b", "#8b5cf6"];
    var randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];

    //create the element inside the constructor
    this.element = document.createElement("div");
    this.element.className = "circle";
    this.element.style.width = this.diameter + "px";
    this.element.style.height = this.diameter + "px";
    this.element.style.borderRadius = this.radius + "px";
    this.element.style.left = (relativeX - this.radius) + "px"; //computation to get the left value
    this.element.style.top = (relativeY - this.radius) + "px"; //computation to get the top value
    this.element.style.backgroundColor = randomColor;
    this.element.style.position = "absolute"; //added style.position

    container.appendChild(this.element); //in this case, you append the element dynamically to the actual container passed; BIG Difference vs. previous assignment where its hardcoded to body and specific ID

    //methods of Circle class in ES5
    //updateSize(amount) method in this case does the actual reduction of the size of the circle by the given amount.
    this.updateSize = function(amount) {
        this.diameter = this.diameter - amount;

        if (this.diameter <= 0) {
            clearInterval(this.timer);
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        } else {
            this.radius = this.diameter / 2;
            this.element.style.width = this.diameter + "px";
            this.element.style.height = this.diameter + "px";
            this.element.style.borderRadius = this.radius + "px";
            this.element.style.left = (relativeX - this.radius) + "px";
            this.element.style.top = (relativeY - this.radius) + "px";
        }
    };

    //shrink() method in this case starts and manages the time-based loop (setInterval) to reduce the size of circle.
    this.shrink = function() {
        this.timer = setInterval(this.updateSize.bind(this, 1), 20);
    };

    this.shrink();
}

// 2. MAIN LIBRARY CLASS - CLIB (only thing that is accessed in the HTML)
function Clib(circleCount, containerid) {
    this.containerid = containerid; //container where the circles will be spawned
    this.count = circleCount; //count of circles to be max spawned
    this.container = document.getElementById(this.containerid); //get the container element itself

    //Method for interactive population of circle by clicking anywhere inside the container
    this.init = function(){
        if (this.container){
            // position container properly for absolute children
            this.container.style.position = "relative";
            this.container.style.overflow = "hidden";

            var self = this; //keep context for event listener
            // Bind click listener once
            if (!this.container.dataset.interactive) {
                this.container.addEventListener("click", function(e) {
                    new Circle(e.clientX, e.clientY, self.container);
                });
                this.container.dataset.interactive = "true";
            }
        }
    }

    this.init()

    // Method to draw the circles inside the specified container
    this.draw_circles = function() {

        if (this.container){
            var rect = this.container.getBoundingClientRect();

            // Spawns the batch count passed into new Circles(N)
            for (var i = 0; i < this.count; i++) {
                var randomX = rect.left + Math.random() * rect.width;
                var randomY = rect.top + Math.random() * rect.height;

                new Circle(randomX, randomY, this.container);
            }
        }
    };
}

//time spent: 1hr