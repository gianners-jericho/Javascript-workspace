// 1: Arrow Function
const javascript = (language = "JavaScript") => `I love ${language}!!!`;
console.log(javascript());

// 2: Objects
let obj = {
    quote: "I love JavaScript!!!",
    print: function(){
        return this.quote;
    }
}
console.log(obj.print());

// 3: Callbacks
function print(callback) {
    console.log(callback());
}

print(function() {
    return "I love JavaScript!!!";
});

// 4: Immediate Functions
(function(){
    let language = "JavaScript";
    console.log(`I love ${language}!!!`);
})();

// 5: Closures
function favorite_language(){
    let language = "JavaScript";
    function love(){
        console.log(`I love ${language}!!!`)
    }
    return love;
}

let favorite = favorite_language()
favorite()

// 6: Class ES6
class CodeSensei{
    constructor(){
        this.language = "JavaScript";
    }

    printLove(){
        console.log(`I love ${this.language}!!!`);
    }
}

let sensei1 = new CodeSensei();
sensei1.printLove();

// 7: Class ES5
function CodeSensei2() {
    this.language = "JavaScript";
    this.printLanguage = function(){
        return `I love ${this.language}!!!`;
    }
}
var sensei2 = new CodeSensei2();
console.log(sensei2.printLanguage());

// 8: Class ES5 w/ Prototype
function CodeSensei3(){
    this.language = "JavaScript";
}

CodeSensei3.prototype.languagePrint = function(){
    return `I love ${this.language}!!!`;
}

var sensei3 = new CodeSensei3();
console.log(sensei3.languagePrint());

// Functions
function print_str(statement){
    console.log(statement);
}

print_str("I love JavaScript!!!");