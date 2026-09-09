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
class Circle {
    constructor(diameter, maxDiameter, growthRate, color){
        this.diameter = diameter;
        this.maxDiameter = maxDiameter;
        this.growthRate = growthRate;
        this.color = color;
        this.element = null; //will store the reference to the actual <div> node/ DOM object so we can manipulate it programmatically e.g. attaching event listeners, changing styles, or removing the element.
        this.setIntervalId = null; //id of each setInterval process running so we can clear them when finished
    }

    get isAlive(){
        return this.diameter <= this.maxDiameter;
    }

    // get radius()

    //render circle and append to parent container to display it in DOM
    render(parentContainer){
        this.element = document.createElement("div"); //what i learned: createElement only creates an element in ram, appendChild() or append() renders it in the DOM
        this.element.className = "circle";
        this.element.style.left = `${getRandomInt(1, parentContainer.clientWidth)}px`;
        this.element.style.top = `${getRandomInt(1, parentContainer.clientHeight)}px`;
        this.element.style.width = this.diameter + "px";
        this.element.style.height = this.diameter + "px";
        this.element.style.backgroundColor = this.color;
        this.element.style.borderRadius = '50%';

        parentContainer.append(this.element); //render to DOM
    }

    grow(){
        this.diameter += this.growthRate;
        if(this.element){
            this.element.style.width = `${this.diameter}px`;
            this.element.style.height = `${this.diameter}px`;
        }
    }

    destroy(){

        //check if reference to setInterval process still exists
        if(this.setIntervalId){
            clearInterval(this.setIntervalId) //stop the process
            this.setIntervalId = null; //reset to null
        }
        //check if element exists then remove from DOM
        if(this.element){
            this.element.remove();
            this.element = null;
        }
    }

    // WRONG - REBINDS THIS TO WINDOW OBJECT
    // startGrow(interval = 25){
    //     this.setIntervalId = setInterval(function(){
    //         if (this.isAlive){
    //             this.grow();
    //         }
    //         else{
    //             this.destroy();
    //         }
    //     }, interval);
    // }

    startGrow(interval = 25){
        this.setIntervalId = setInterval(() => {
            if(this.isAlive){
                this.grow();
            }
            else{
                this.destroy();
            }
        }, interval);
    }
}

class Circles {
    constructor(quantity){
        this.quantity = quantity;
        this.circles = []; //store all circles created so we can access them individually if needed
    }

    draw_circles(parentContainerId){
        const container = document.getElementById(parentContainerId);

        for(let i = 0; i < this.quantity; i++){

            const diameter = getRandomInt(0, 30);
            const maxDiameter = getRandomInt(100, 300);
            const color = getRandomColor();
            const growthRate = getRandomFloat(0.5, 2.0);

            //construct circle
            const circle = new Circle(diameter, maxDiameter, growthRate, color)
            circle.render(container);
            circle.startGrow();
            this.circles.push(circle);
        }
    }
}