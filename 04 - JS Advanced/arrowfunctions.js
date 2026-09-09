/*1.) (a, b) => {
        let x = 10;
        return x+a*b;
      }
*/
function compute(a, b) {
    let x = 10;
    return x + a * b;
}

/*2.) (a=10, b=5) => a+b; */
function sum(a = 10, b = 5) {
    return a + b;
}

/*3.) const obj = {
        name: 'coding',
        b: (word) => {
            console.log(this.name, word);
        }
      }
      obj.b('is fun');
*/
const obj = {
    name: 'coding',
    b : function(word) {
        console.log(this.name, word);
    }
}
obj.b('is fun');

//time spent: 5mins