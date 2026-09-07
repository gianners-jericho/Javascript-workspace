# Foreach

Create a function called `foreach` where the following code would work the way described below. Submit your assignment by attaching JS file.

```js
//1
let result = foreach([1,2,3,4,5], function(num) { return num*2; });
console.log(result); //this should log [2,4,6,8,10]

//2
result = foreach([1,2,3,"v88", "training"], function(val) {
    if(typeof(val) === 'number') {
        return 0;
    }
    else {
        return val;
    }
});
console.log(result); //this should log [0,0,0,"v88","training"];

//3
result = foreach([1,2,3,"hello"], function(val) { return typeof(val); });
console.log(result); //this should log ["number", "number", "number", "string"];
```

Note how for the second foreach callback function, for a simple if/else statement, we can also use a ternary operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

If a ternary operator is used, above code could be simplified as follows:

```js
//1
let result = foreach([1,2,3,4,5], function(num) { return num*2; });
console.log(result); //this should log [2,4,6,8,10]

//2
result = foreach([1,2,3,"v88", "training"], function(val) {
    return ( (typeof(val) === 'number') ? 0 : val);
});
console.log(result); //this should log [0,0,0,"v88","training"];

//3
result = foreach([1,2,3,"hello"], function(val) { return typeof(val); });
console.log(result); //this should log ["number", "number", "number", "string"];
```

ANSWER:
```js
function foreach(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result[i] = callback(arr[i]);
    }
    return result;
}
```

# Filter

Create a function called `filter` where it filters out any value in the array that doesn't meet the condition as specified in the callback function. For example,

```js
/*1*/
let result = filter([1,2,3,4,15], function(val) { return val<10; }); //this filters each value in the array and only allows values that are less than 10
console.log(result); //this should log [1,2,3,4]

/*2*/
let result = filter([1,2,3,4,15], function(val) { return val<3; }); //only allows values that is less than 3
console.log(result); //this should log [1,2]
```

ANSWER:
```js
function filter(arr, callback) {
    let result = [];
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i]) {
            result(index) = arr[i];
            index++;
        }
    }
}
```

# Reject

Create a function called `reject` that acts the opposite of the filter function. For example, have it reject any value in the array that meets the requirement specified in the callback function. For example,

```js
/*1*/
let result = reject([1,2,3,4,15], function(val) { return val<10; }); //rejects any value that is less than 10
console.log(result); //this should log [15]

/*2*/
let result = reject([1,2,3,4,15], function(val) { return val<3; }); //rejects any value that is less than 3
console.log(result); //this should log [3,4,15]
```

ANSWER:
```js
function reject(arr, callback) {
    let result = [];
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        if(!callback(arr[i])) {
            result[index] = arr[i];
            index++;
        }
    }
    return result;
}
```