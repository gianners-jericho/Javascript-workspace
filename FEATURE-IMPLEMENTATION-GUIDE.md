# Feature Implementation Guide: String Module

## Overview
This guide provides the complete, minimal, step-by-step implementation instructions for the **String Module** assignment located in `05 - Node.js/03 - String Module`. 

The objective is to create a custom Node.js module that exposes four common string manipulation algorithms (`concat`, `repeat`, `toString`, `charAt`) without relying on existing built-in `String.prototype` methods (such as `.concat()`, `.repeat()`, `.toString()`, or `.charAt()`). An `app.js` entry file consumes the module and demonstrates all operations.

---

## Chronological Implementation Sequence

```
1. Create stringlib.js  -->  Define module export factory returning the 4 string methods
2. Create app.js        -->  Import stringlib.js, execute each method, and log results
3. Verification         -->  Run app.js via Node.js to verify console output
```

---

## Step 1: Create `stringlib.js`

- **File Path**: `05 - Node.js/03 - String Module/stringlib.js`
- **Operation**: Create

### Code Snippet

```javascript
module.exports = function () {
    return {
        concat: function (word1, word2) {
            return "" + word1 + word2;
        },
        repeat: function (word, times) {
            let result = "";
            for (let i = 0; i < times; i++) {
                result += word;
            }
            return result;
        },
        toString: function (input) {
            return "" + input;
        },
        charAt: function (word, index) {
            return word[index];
        }
    };
};
```

### Technical Explanation

- **Module Pattern (`module.exports = function () { return { ... }; };`)**:
  - Exports a factory function in CommonJS format.
  - When invoked by the consumer (`require("./stringlib.js")()`), it returns an object containing the library methods, ensuring a clean and isolated instance.
- **`concat(word1, word2)`**:
  - Uses the binary addition operator (`+`) preceded by an empty string `""` to enforce string coercion and concatenate `word1` and `word2`.
  - Avoids `String.prototype.concat()`.
- **`repeat(word, times)`**:
  - Initializes an empty accumulator string (`result = ""`).
  - Iterates `times` times using a standard `for` loop, appending `word` to `result` on each iteration.
  - Avoids `String.prototype.repeat()`.
- **`toString(input)`**:
  - Concatenates the input with an empty string primitive `"" + input`. In JavaScript, the `+` operator with an empty string implicitly coerces any primitive or object to a string primitive.
  - Avoids `String(input)` and `input.toString()`.
- **`charAt(word, index)`**:
  - Uses standard JavaScript string index access (`word[index]`). Strings in ECMAScript behave as array-like objects with indexed character access.
  - Avoids `String.prototype.charAt()`.

---

## Step 2: Create `app.js`

- **File Path**: `05 - Node.js/03 - String Module/app.js`
- **Operation**: Create

### Code Snippet

```javascript
const stringlib = require("./stringlib.js")();

// 1. Join two words
console.log(stringlib.concat("Village", "88")); // Output: Village88

// 2. Repeat string specific count
console.log(stringlib.repeat("ha", 3)); // Output: hahaha

// 3. Convert input to string data type
console.log(stringlib.toString(5)); // Output: "5"

// 4. Return character from specific position
console.log(stringlib.charAt("nice", 2)); // Output: "c"
```

### Technical Explanation

- **`require("./stringlib.js")()`**:
  - Loads the local `stringlib.js` CommonJS module.
  - Immediately invokes the exported factory function using `()` to retrieve the object containing the four methods, assigning it to `stringlib`.
- **Test Executions**:
  - `stringlib.concat("Village", "88")`: Verifies joining two words into `"Village88"`.
  - `stringlib.repeat("ha", 3)`: Verifies repeating `"ha"` three times to produce `"hahaha"`.
  - `stringlib.toString(5)`: Verifies converting number `5` into string `"5"`.
  - `stringlib.charAt("nice", 2)`: Verifies retrieving index `2` of `"nice"`, which is `'c'`.

---

## Step 3: Verification

### Command

Run the application using Node.js from the assignment directory:

```bash
node "05 - Node.js/03 - String Module/app.js"
```

### Expected Output

```
Village88
hahaha
5
c
```
