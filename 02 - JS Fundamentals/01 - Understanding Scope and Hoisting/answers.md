## Code Example 1:

```javascript
var a = 10;
function abc() {
    var a = 15;
    console.log('a is', a);
}
console.log('a really is', a);
```

## Example 1 T diagram:

### Main:
| Variable | Value |
|:---------|:------|
| a | 10 |

Output:
```
a really is 10
```

## Code Example 2:
```javascript
var a = 10;
function abc() {
    var a = 15;
    console.log('a is', a);
}
abc();
console.log('a really is', a);
```
## Example 2 T diagram:

### Main:
| Variable | Value |
|:---------|:------|
| a | 10 |

Output:
```
a is 15
a really is 10
```

## Code Example 3:

```javascript
if(a == undefined) {
   console.log("a is declared but hasn't been set to a specific value yet");
}
```

## Example 3 T diagram:

### Main:
| Variable | Value |
|:---------|:------|
| a | undefined |

Output:
```
a is declared but hasn't been set to a specific value yet
```

## Code Example 4:

```javascript
if(a == undefined) {
   console.log("a is declared but hasn't been set to a specific value yet");
}
var a = 15;
```

## Example 4 T diagram:

### Main:
| Variable | Value |
|:---------|:------|
| a | undefined |
| a | 15 |

Output:
```
a is declared but hasn't been set to a specific value yet
```

## Code Example 5:

```javascript
var a = 15;
function abc(a){
   return a+10;
}
var final = abc(a);
console.log('final is', final);
```

## Example 5 T diagram:

### Main:
| Variable | Value |
|:---------|:------|
| a | 15 |
| final | 25 |

### abc()
| Variable | Value |
|:---------|:------|
| a | 15 |

Output:
```
final is 25
```

## Code Example 6:

```javascript
var a = 15;
function abc(){
   a = a+10;
}
console.log('a is', a);
```

## Example 6 T diagram:

### Main:
| Variable | Value |
|:---------|:------|
| a | 15 |

Output:
```
a is 15
```

## Code Example 7:

```javascript
var a = 15;
function abc(){
   a = a+10;
}
console.log('a is', a);
abc();
console.log('a is', a);
```

## Example 7 T diagram:

### Main:
| Variable | Value |
|:---------|:------|
| a | 15 |
| a | 25 |

Output:
```
a is 15
a is 25
```

## Code Example 8:

```javascript
var a = 15;
function abc(){
   var a = a+10;
}
console.log('a is', a);
abc();
console.log('a is', a);
```

## Example 8 T diagram:

### Main:
| Variable | Value |
|:---------|:------|
| a | 15 |
| a | 15 |

Output:
```
a is 15
a is 15
```

## Code Example 9:

```javascript
var a = 15;
function abc(a){
   a = a +15;
}
console.log('a is', a);
abc();
console.log('a is', a);
```

## Example 9 T diagram:

### Main:
| Variable | Value |
|:---------|:------|
| a | 15 |
| a | 15 |

Output:
```
a is 15
a is 15
```
