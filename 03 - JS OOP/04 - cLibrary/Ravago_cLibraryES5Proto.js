function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

function Circle(color, x, y, size = 100, max_size = 350){
    this.color = color;
    this.x = x;
    this.y = y;
    this.size = size;
    this.max_size = max_size
    this.state = "growing"; // display: none if "popped"
};
    
Circle.prototype.grow = function() {
    this.size += 10;
    if(this.size >= this.max_size){
        this.pop();
    }
};

Circle.prototype.pop = function() {
    this.state = "popped"
};

function cLib(amount){
    this.live_circles = [];
    this.generated_circles = [];
    this.colors = ["tomato", "orange", "dodgerblue", "mediumseagreen", "gray", "slateblue", "violet", "lightgray"];
    this.init(amount);
}

cLib.prototype.init = function(amount){
    for(let i = 0; i < amount; i++){
        let color = this.colors[getRandomInt(0, this.colors.length)]
        let size = getRandomInt(100, 200)

        let circle = new Circle(color, 0, 0, size);
        let element = document.createElement("div");

        element.style.backgroundColor = circle.color;
        element.style.height = circle.size + "px";
        element.style.width = circle.size + "px";
        element.style.borderRadius = "50%";
        element.style.position = "absolute";

        this.generated_circles.push({circle, element});
    }

    console.log(`loaded ${this.generated_circles.length} circles. (ES5 Proto)`)
    console.log(this.generated_circles);
}

cLib.prototype.drawCircles = function(target){
    let parent = document.querySelector(target);
    let parentArea = parent.getBoundingClientRect(); // returns coordinates of each side
    
    // render every 50ms
    setInterval(() => {
        // add new one from generated array
        if(this.generated_circles.length > 0){
            let {circle, element} = this.generated_circles.pop();
            
            // add elements to area inside of target
            element.style.left = `${Math.random() * parentArea.width}px`;
            element.style.top = `${Math.random() * parentArea.height}px`;

            parent.appendChild(element);
            this.live_circles.push({circle, element})
        }

        // grow each live circle
        for(let i = 0; i < this.live_circles.length; i++){
            let {circle, element} = this.live_circles[i];

            if(circle.state == "popped"){
                // remove if already popped
                element.style.display = "none";
            }
            else {
                // else grow instead
                circle.grow();
                element.style.width = circle.size + "px";
                element.style.height = circle.size + "px";
            }
        }
    }, 50)
}