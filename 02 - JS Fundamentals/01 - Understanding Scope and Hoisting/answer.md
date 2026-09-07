# JavaScript Variable Scope & Hoisting

## Example 1

```js
var a = 10;
function abc() {
    var a = 15;
    console.log('a is', a);
}
console.log('a really is', a);
```

```
main   | output
-------+----------
a      | 10
abc    | function
```

**Output:**
```
a really is 10
```

---

## Example 2

```js
var a = 10;
function abc() {
    var a = 15;
    console.log('a is', a);
}
abc();
console.log('a really is', a);
```

```
main   | output          abc()  | output
-------+----------       -------+----------
a      | 10              a      | 15
abc    | function
```

**Output:**
```
a is 15
a really is 10
```

---

## Example 3

```js
if(a == undefined) {
   console.log("a is declared but hasn't been set to a specific value yet");
}
```

```
main   | output
-------+--------------
a      | not declared
```

**Output:**
```
ReferenceError: a is not defined
```

---

## Example 4

```js
if(a == undefined) {
   console.log("a is declared but hasn't been set to a specific value yet");
}
var a = 15;
```

```
main   | output
-------+-----------
a      | undefined
a      | 15
```

**Output:**
```
a is declared but hasn't been set to a specific value yet
```

---

## Example 5

```js
var a = 15;
function abc(a){
   return a+10;
}
var final = abc(a);
console.log('final is', final);
```

```
main   | output          abc()  | output
-------+----------       -------+----------
a      | 15              a      | 15
abc    | function        return | 25
final  | 25
```

**Output:**
```
final is 25
```

---

## Example 6

```js
var a = 15;
function abc(){
   a = a+10;
}
console.log('a is', a);
```

```
main   | output
-------+----------
a      | 15
abc    | function
```

**Output:**
```
a is 15
```

---

## Example 7

```js
var a = 15;
function abc(){
   a = a+10;
}
console.log('a is', a);
abc();
console.log('a is', a);
```

```
main   | output          abc()  | output
-------+----------       -------+----------
a      | 15 → 25         
abc    | function         
```

**Output:**
```
a is 15
a is 25
```

---

## Example 8

```js
var a = 15;
function abc(){
   var a = a+10;
}
console.log('a is', a);
abc();
console.log('a is', a);
```

```
main   | output          abc()  | output
-------+----------       -------+----------
a      | 15              a      | undefined
abc    | function        a      | NaN
```

**Output:**
```
a is 15
a is 15
```

---

## Example 9

```js
var a = 15;
function abc(a){
   a = a +15;
}
console.log('a is', a);
abc();
console.log('a is', a);
```

```
main   | output          abc()  | output
-------+----------       -------+----------
a      | 15              a      | undefined
abc    | function        a      | NaN
```

**Output:**
```
a is 15
a is 15
```
