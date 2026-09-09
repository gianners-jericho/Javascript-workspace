function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor(){
    const red = getRandomInt(0, 255);
    const green = getRandomInt(0, 255);
    const blue = getRandomInt(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

//individual circle implementation
function Circle(diameter, maxDiameter, growthRate, color){
    var self = this; //STORE THIS IN VARIABLE - NECESSARY FOR SETINTERVAL TO PREVENT THIS REBIND WHEN USING PURE ES5 FUNCTION CALLBACKS

    this.diameter = diameter;
    this.maxDiameter = maxDiameter;
    this.growthRate = growthRate;
    this.color = color;
    this.element = null; //will store the reference to the actual <div> node/ DOM object so we can manipulate it programmatically e.g. attaching event listeners, changing styles, or removing the element.
    this.setIntervalId = null; //id of each setInterval process running so we can clear them when finished

    this.isAlive = function(){
        return self.diameter <= self.maxDiameter;
    };

    // get radius()

    //render circle and append to parent container to display it in DOM
    this.render = function(parentContainer){
        self.element = document.createElement("div"); //what i learned: createElement only creates an element in ram, appendChild() or append() renders it in the DOM
        self.element.className = "circle";
        self.element.style.left = getRandomInt(1, parentContainer.clientWidth) + "px";
        self.element.style.top = getRandomInt(1, parentContainer.clientHeight) + "px";
        self.element.style.width = self.diameter + "px";
        self.element.style.height = self.diameter + "px";
        self.element.style.backgroundColor = self.color;
        self.element.style.borderRadius = '50%';

        parentContainer.append(self.element); //render to DOM
    };

    this.grow = function(){
        self.diameter += self.growthRate;
        if(self.element){
            self.element.style.width = self.diameter + "px";
            self.element.style.height = self.diameter + "px";
        }
    };

    this.destroy = function(){

        //check if reference to setInterval process still exists
        if(self.setIntervalId){
            clearInterval(self.setIntervalId); //stop the process
            self.setIntervalId = null; //reset to null
        }
        //check if element exists then remove from DOM
        if(self.element){
            self.element.remove();
            self.element = null;
        }
    };

    this.startGrow = function(interval){
        var timerInterval = interval || 25;

        self.setIntervalId = setInterval(function(){
            if(self.isAlive()){
                self.grow();
            }
            else{
                self.destroy();
            }
        }, timerInterval);
    };
}

function Circles(quantity){
    var self = this;

    this.quantity = quantity;
    this.circles = []; //store all circles created so we can access them individually if needed

    this.draw_circles = function(parentContainerId){
        var container = document.getElementById(parentContainerId);

        for(var i = 0; i < self.quantity; i++){

            var diameter = getRandomInt(0, 30);
            var maxDiameter = getRandomInt(100, 300);
            var color = getRandomColor();
            var growthRate = getRandomFloat(0.5, 2.0);

            //construct circle
            var circle = new Circle(diameter, maxDiameter, growthRate, color);
            circle.render(container);
            circle.startGrow();
            self.circles.push(circle);
        }
    };
}