//1. Create a function that takes another function as its argument.  Have the function execute the passed function.

function runCallback(fn) {
    fn();
}

runCallback(function (){
    console.log("Exercise 1 executed!!!");
});

//2. Create a function that returns a function.  Have the returned function be executed.
function createFunction() {
    return function() {
        console.log("Exercise 2 executed!!!");
    }
};
const myfunc = createFunction();
myfunc();

//3. Create a function that takes two functions as its arguments.  Randomly, either execute the first function or the second function.
function executeRandomly(fn1, fn2) {
    if (Math.random() < 0.5) {
        fn1();
    } else {
        fn2();
    }
}

function funcA() {
    console.log("Exercise 3: Executed function A!");
}

function funcB() {
    console.log("Exercise 3: Executed function B!");
}

executeRandomly(funcA, funcB);

//time spent: 10mins