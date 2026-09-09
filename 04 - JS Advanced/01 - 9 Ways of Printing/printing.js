// 1: Functions
function displayMessage(message) {
    console.log(message);
}

const text1 = "I love JavaScript!!!";
displayMessage(text1);

// 2: Objects
let text2 = {
    text: "I love JavaScript!!!",
    show: function() {
        return this.text;
    }
};
console.log(text2.show());

// 3: Class ES5
function Coder() {
    this.text = "JavaScript";
    this.speak = function() {
        return `I love ${this.text}!!!`;
    };
}
var text3 = new Coder();
console.log(text3.speak());

// 4: Class ES5 w/ Prototype
function Developer() {
    this.text = "JavaScript";
}

Developer.prototype.announce = function() {
    return `I love ${this.text}!!!`;
};

var text4 = new Developer();
console.log(text4.announce());

// 5: Class ES6
class Programmer {
    constructor() {
        this.language = "JavaScript";
    }

    shout() {
        console.log(`I love ${this.language}!!!`);
    }
}

let text5 = new Programmer();
text5.shout();

// 6: Closures
function makeAnnouncer() {
    let text = "JavaScript";
    function announce() {
        console.log(`I love ${text}!!!`);
    }
    return announce;
}

let text6 = makeAnnouncer();
text6();

// 7: Immediate Functions
(function() {
    let text7 = "JavaScript";
    console.log(`I love ${text7}!!!`);
})();

// 8: Callbacks
function run(getMessage) {
    console.log(getMessage());
}

const text8 = function() {
    return "I love JavaScript!!!";
};
run(text8);

// 9: Arrow Function
const text9 = (text = "JavaScript") => `I love ${text}!!!`;
console.log(text9());
