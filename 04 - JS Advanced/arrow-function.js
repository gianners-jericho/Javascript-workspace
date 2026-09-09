// (a, b) => {
//     let x = 10;
//     return x+a*b;
// }

function calculate(a, b) {
    let x = 10;
    return x + a * b;
}

// (a=10, b=5) => a+b;

function add(a = 10, b = 5) {
    return a + b;
}

// const obj = {
//    name: 'coding',
//    b: (word) => {
//       console.log(this.name, word);
//    }
// }
// obj.b('is fun');

const obj = {
   name: 'coding',
   b: function(word) {
      console.log(this.name, word);
   }
}
obj.b('is fun');