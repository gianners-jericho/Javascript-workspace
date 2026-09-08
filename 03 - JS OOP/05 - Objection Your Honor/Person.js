//Person class (super class)
export default class Person {
    #name;
    #age;
    
    //constructor
    constructor (name, age){
        this.#name = name;
        this.#age = age;
    }

    //getter methods
    get name() {
        return this.#name;
    }

    get age() {
        return this.#age;
    }
}