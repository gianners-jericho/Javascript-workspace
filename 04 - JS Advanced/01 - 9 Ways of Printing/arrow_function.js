// For translating arrow functions to traditional functions

// 1
function multiply(a, b){
    let x = 10;
    return x + a * b;
}

// 2
function sum(a = 10, b = 5){
    return a + b;
}

// 3
const obj = {
    name: 'coding',
    b: function(word){
        console.log(this.name, word)
    }
}
obj.b("is fun")