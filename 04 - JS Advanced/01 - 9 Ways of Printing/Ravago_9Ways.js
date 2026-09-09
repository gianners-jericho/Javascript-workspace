// 1. Regular console.log
console.log("I love Javascript!!!");

// 2. Arrow function
let arrowFunction = () => {
    console.log("I love Javascript!!!");
}
arrowFunction();

// 3. Closure
function closureFunction() {
    let message = "I love Javascript!!!";
    function logMessage() {
        console.log(message);
    }
    logMessage();
}
closureFunction();

// 4. Assignment Reference
let original = ["Old message"];
let copy = original;
copy[0] = "I love Javascript!!!";
console.log(original[0]);

// 5. ES6 Class
class Person {
    static hello() {
        console.log("I love Javascript!!!");
    }
}
Person.hello();

// 6. ES5 Class With Prototypes
function Dog() {
    this.breed = "Golden Retriever";
}
Dog.prototype.bark = function(){ 
    console.log("I love Javascript!!!");
}
let chase = new Dog();
chase.bark();

// 7. ES5 Class
function Cat() {
    this.breed = "Siamese"
    this.meow = function() {
        console.log("I love Javascript!!!")
    }
}
let tuna = new Cat();
tuna.meow();

// 8. ES6 Inheritance
class Bird {
    constructor(){
        this.color = "green";
    }

    chirp(){
        console.log("chirp!");
    }
}

class Parrot extends Bird {
    constructor(){
        super();
    }

    chirp(){
        console.log("I love Javascript!!!");
    }
}

let birdie = new Parrot();
birdie.chirp();

// 9. Callbacks
function execute(callback){
    callback();
}

execute(function(){ console.log("I love Javascript!!!") })