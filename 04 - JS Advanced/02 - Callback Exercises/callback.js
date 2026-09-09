// Challenge 1
const language = function(language){
    return language;
}

function learnLanguage(language, callback){
    let programming_language = callback(language);
    console.log(`I am currently learning ${programming_language}!!!`);
}

learnLanguage("JavaScript", language);

// Challenge 2
let isEven = (function() {
    return function(number){
        return number % 2 == 0;
    }
})();

console.log(isEven(5));
console.log(isEven(4));

// Challenge 3
function claude(){
    console.log("Claude");
}

function code(){
    console.log("Code");
}

function claudeCode(claude, code){
    let random = Math.random();

    if (random > 0.5) {
        claude();
    } else {
        code();
    }
}

claudeCode(claude, code);