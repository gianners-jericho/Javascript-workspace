//create a function that takes another function as an argument and executes it

function wrapper(callback){
    callback();
}

wrapper(function(){
    console.log("Called from wrapper!")
});

//create a function that returns a function, execute the returned function.

function generatePrinter(){
    return function(text){
        console.log(text);
    }
}

const myPrinter = generatePrinter();
myPrinter("hello world");

//create a function that takes two functions as its arguments. Randomly execute either function.
function coinFlip(heads, tails) {
    const result = Math.floor(Math.random() * 2) + 1;
    if(result == 1){
        heads();
    }
    else{
        tails();
    }
}

coinFlip(function(){console.log("heads")}, function(){console.log("tails")})
