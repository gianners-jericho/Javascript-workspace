// 1. takes a function as an argument, executes it
function executeCallback(callback) {
    callback();
}

executeCallback(function() {
    console.log("I was passed in and executed!");
});

// 2. returns a function, then that returned function gets executed
function makeGreeter() {
    return function() {
        console.log("I was returned, then executed!");
    };
}

const greet = makeGreeter();
greet();

// 3. takes two functions, randomly executes one of them
function executeRandomly(A, B) {
    const chosen = Math.random() < 0.5 ? A : B;
    chosen();
}

executeRandomly(
    function() {
        console.log("Function A was chosen!");
    },
    function() {
        console.log("Function B was chosen!");
    }
);
