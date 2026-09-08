class Shape {
    constructor(color, x, y, shape_string = "", size = 100, max_size = 350,){
        this.color = color;
        this.x = x;
        this.y = y;
        this.shape_string = shape_string; // css for shaping div
        this.size = size;
        this.max_size = max_size
        this.state = "growing"; // display: none if "popped"
    };
    
    grow() {
        this.size += 10;
        if(this.size >= this.max_size){
            this.pop();
        }
    };

    pop() {
        this.state = "popped"
    };

    getStyles() {
        return this.shape_string;
    };
}

class Circle extends Shape {
    constructor(color, x, y, shape_string = "border-radius: 50%;", size = 100, max_size = 350,){
        super(color, x, y, shape_string, size, max_size);
    };
}

class Square extends Shape {
    constructor(color, x, y, shape_string = "", size = 100, max_size = 350,){
        super(color, x, y, shape_string, size, max_size);
        this.rotation = 0;
    };

    grow() {
        super.grow();
        this.rotation += 5;
    }

    getStyles() {
        return `transform: rotate(${this.rotation}deg)`
    }
}

class Parallelogram extends Shape {
    constructor(color, x, y, shape_string = "transform: skew(20deg);", size = 100, max_size = 350){
        super(color, x, y, shape_string, size, max_size);
        this.skew = 20;
    }

    grow() {
        super.grow();
        this.skew = Math.min(this.skew + 1, 45); // caps at 45deg
    }

    getStyles() {
        return `transform: skew(${this.skew}deg)`
    }
}


let shapes = []; // keep {class, div} for sync

function createShape(shape, color, x, y) {
    let shape_obj; 
    if(shape == "circle"){
        shape_obj = new Circle(color, x, y);
    }

    else if(shape == "square"){
        shape_obj = new Square(color, x, y)
    }

    else if(shape == "parallelogram"){
        shape_obj = new Parallelogram(color, x, y)
    }

    let element = document.createElement("div");

    element.style.backgroundColor = shape_obj.color;
    element.style.left = shape_obj.x + "px";
    element.style.top = shape_obj.y + "px";
    element.style.height = shape_obj.size + "px";
    element.style.width = shape_obj.size + "px";
    element.style.position = "absolute";

    element.style.cssText += shape_obj.shape_string;

    document.body.appendChild(element);
    console.log(shape_obj, element);
    shapes.push({shape_obj, element});
} 

// render every 50ms
setInterval(() => {
    for(let i = 0; i < shapes.length; i++){
        let {shape_obj, element} = shapes[i];

        if(shape_obj.state == "popped"){
            // remove if already popped
            element.style.display = "none";
        }
        else {
            // else grow instead
            shape_obj.grow();
            element.style.width = shape_obj.size + "px";
            element.style.height = shape_obj.size + "px";
            element.style.cssText += shape_obj.getStyles();
        }
    }
}, 50)