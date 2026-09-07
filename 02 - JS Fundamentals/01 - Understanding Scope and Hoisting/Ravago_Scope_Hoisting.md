## Wendell Lance M. Ravago

Chapter 2 Assignment 1

Understanding Scope and Hoisting

----
### Example 1
```js
var a = 10;
function abc() {
    var a = 15;
    console.log('a is', a);
}
console.log('a really is', a);
```
##### T-Diagram
| variable  | value |
| ------------- |:-------------:|
|  a  |  10  |

The function `abc` wasn't called, so `a` remains 10.

---

### Example 2
```js
var a = 10;
function abc() {
    var a = 15;
    console.log('a is', a);
}
abc();
console.log('a really is', a);
```
##### T-Diagram
| variable  | value |
| ------------- |:-------------:|
|  a  |  ~~10~~ 15 |

The function `abc` was called, so `a` becomes 15.

--- 

### Example 3
```js
if(a == undefined) {
   console.log("a is declared but hasn't been set to a specific value yet");
}
```
##### T-Diagram
| variable  | value |
| ------------- |:-------------:|
|  a  |  `not defined`|

This gives an error, as `a` cannot be found.

---

### Example 4
```js
if(a == undefined) {
   console.log("a is declared but hasn't been set to a specific value yet");
}
var a = 15;
```
##### T-Diagram
| variable  | value |
| ------------- |:-------------:|
|  a  |  `undefined`|

This prints the console.log value. Javascript knows the `a` variable is present but it doesn't know its value yet, so it becomes `undefined`.

---

### Example 5
```js
var a = 15;
function abc(a){
   return a+10;
}
var final = abc(a);
console.log('final is', final);
```
##### T-Diagram
| variable  | value |
| ------------- |:-------------:|
|  a  |  ~~15~~ 25|
|  final  |  abc(15) |

##### T-Diagram - abc()
| variable  | value |
| ------------- |:-------------:|
|  a  |  25 |


The `final` variable calls `abc(a)`, which adds 10 to the value of `a`, making it 25.

---

### Example 6
```js
var a = 15;
function abc(){
   a = a+10;
}
console.log('a is', a);
```
##### T-Diagram
| variable  | value |
| ------------- |:-------------:|
|  a  |  15 |


The `abc` function wasn't called, `a` remains 15. 

---

### Example 7
```js
var a = 15;
function abc(){
   a = a+10;
}
console.log('a is', a);
abc();
console.log('a is', a);
```
##### T-Diagram
| variable  | value |
| ------------- |:-------------:|
|  a  |  ~~15~~ 25|
|abc()| 25|

##### T-Diagram - abc()
| variable  | value |
| ------------- |:-------------:|
|  a  |  25 |

First console.log prints 15. The second console.log prints 25 because `abc()` was called before it, adding 10 to the initial value of 15.

---

### Example 8
```js
var a = 15;
function abc(){
   var a = a+10;
}
console.log('a is', a);
abc();
console.log('a is', a);
```
##### T-Diagram
| variable  | value |
| ------------- |:-------------:|
|  a  |  15 |
|abc()| 25|

##### T-Diagram - abc()
| variable  | value |
| ------------- |:-------------:|
|  a  |  25 |

First console.log prints 15. The second console.log prints 15 too, because the function assigned the result to a variable inside it, making it inaccessible to the second console.log (and still printing 15).

---

### Example 9
```js
var a = 15;
function abc(a){
   a = a +15;
}
console.log('a is', a);
abc();
console.log('a is', a);
```
##### T-Diagram
| variable  | value |
| ------------- |:-------------:|
|  a  |  15 |
|abc()| 15|

##### T-Diagram - abc()
| variable  | value |
| ------------- |:-------------:|
|  a  |  15 |

First console.log prints 15. The second console.log prints 15 too, because there was nothing passed to the function arguments.