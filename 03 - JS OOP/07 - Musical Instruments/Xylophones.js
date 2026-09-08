// Xylophone class (subclass of Instrument)
import Instruments from './Instruments.js';

export default class Xylophones extends Instruments {
    #brand;
    #model;
    #color;

    constructor(brand, model, color) {
        super();
        this.#brand = brand;
        this.#model = model;
        this.#color = color;
    }

    //main methods
    play() {
        return this.playRecord("xylophone");
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