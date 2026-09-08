//ES6 class and inheritances for shapes
//1. SHAPES class (superclass)
export class Shapes {
    #x;
    #y;
    #size;
    #color;
    #container;
    #element;
    #timer;

    //constructor
    constructor(x, y, color, container) {
        this.#x = x;
        this.#y = y;
        this.#color = color;
        this.#container = container;

        this.#size = Math.round(Math.random() * (200 - 10 + 1)) + 10; //Compute random size between 10px and 200
        this.#timer = null; //timer property to be used for updating size of the shape

        // Get container bounds for proper offset calculation
        const rect = container.getBoundingClientRect();
        const relativeX = this.#x - rect.left;
        const relativeY = this.#y - rect.top;

        //create the element inside the constructor
        this.#element = document.createElement("div");
        this.#element.className = "shape";
        this.#element.style.width = `${this.#size}px`;
        this.#element.style.height = `${this.#size}px`;
        this.#element.style.left = `${relativeX}px`; //direct usage instead of computation (computation is for circle)
        this.#element.style.top = `${relativeY}px`; //direct usage instead of computation (computation is for circle)
        this.#element.style.backgroundColor = this.#color;

        container.appendChild(this.#element);
        this.shrink();
    }

    //main method
    //shrink() method - optimized version of shrink method from previous assignment; reduces the size of the shape until it disappears
    shrink() {
        this.#timer = setInterval(() => {
            this.#size -= 1;

            if (this.#size <= 0) {
                clearInterval(this.#timer);
                if (this.#element.parentNode) {
                    this.#element.parentNode.removeChild(this.#element);
                }
            } else {
                this.#element.style.width = `${this.#size}px`;
                this.#element.style.height = `${this.#size}px`;
            }
        }, 20);
    }

    //getter methods
    get element() {
        return this.#element;
    }

    get size() {
        return this.#size;
    }

    set size(val) {
        this.#size = val;
    }
}

//2. Circles, Rectangles, and Stars (subclasses of shape)
//Circles subclass (short version)
export class Circles extends Shapes {
    constructor(x, y, color, container) {
        super(x, y, color, container);
        this.element.style.borderRadius = "50%";
    }
}

//Rectangles subclass
export class Rectangles extends Shapes {
    constructor(x, y, color, container) {
        super(x, y, color, container);
        this.element.style.borderRadius = "0%";
    }
}

//Star subclass (the most difficult shape of all)
export class Stars extends Shapes {
    constructor(x, y, color, container) {
        super(x, y, color, container);
        // Pure CSS 10-point Star using clip-path
        this.element.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
    }
}