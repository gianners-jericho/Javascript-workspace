//Create a function that takes another function as its argument.  Have the function execute the passed function.
function callback1(callbackFn){
    callbackFn();
}
callback1(function(){ console.log("callbackFn 1")});

//Create a function that returns a function.  Have the returned function be executed.
function callback2(callbackFn){
    console.log("returning the callbackFn");
    return callbackFn;
}
let fn = callback2(function(){ console.log("callbackFn 2") })
fn();

//Create a function that takes two functions as its arguments.  Randomly, either execute the first function or the second function.
function callback3(callbackFn1, callbackFn2){
    (Math.random() > 0.5) ? callbackFn1() : callbackFn2();
}
callback3(function(){ console.log("it was true!") }, function(){ console.log("it was false!") });