// Piano class (subclass of Instruments)
import Instruments from './Instruments.js';

export default class Pianos extends Instruments {
    #brand;
    #model;
    #color;

    //constructor
    constructor(brand, model, color) {
        super();
        this.#brand = brand;
        this.#model = model;
        this.#color = color;
    }

    //main methods
    play() {
        return this.playRecord("piano");
    }

    //getter methods
    get brand() { 
        return this.#brand; 
    }
    get model() { 
        return this.#model; 
    }
    get color() { 
        return this.#color; 
    }
}