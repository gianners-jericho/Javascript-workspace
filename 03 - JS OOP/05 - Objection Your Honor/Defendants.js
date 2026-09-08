//Defendants class (subclass of Person)
import Person from './Person.js';

export class Defendants extends Person {
    #case; //case attribute for defendant

    //constructor (using constructor of superclass)
    constructor(name, age){
        super(name, age);
    }

    //getter method
    get case() {
        return this.#case;
    }

    //setter methdod
    set case(caseObj) {
        this.#case = caseObj;
    }
}