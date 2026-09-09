//9 WAYS OF PRINTING
//1.) function declaration
function print_str(word) {
    console.log(word);
}

//2.) Arrow functions
const print_str = (word) => console.log(word);

//3.) ES6 class instance method
class printer {
    //method
    print(word){
        console.log(word);
    }
}

//4.)ES5 prototype
function printer(){
    this.name = 'epson inkjet'
}
printer.prototype.print_str = function(word) {
    console.log(word);
}

//5.) callbacks
function processOutput(word, callback) {
    callback(word); // Invokes the function passed as an argument
}

function print_str(word) {
    processOutput(word, function(data) {
        console.log(data);
    });
}

//6.) function expression
const print_str = function(word) {
    console.log(word);
}

//7.) ES6 object literal
const obj = {
    print(word) {
        console.log(word);
    }
}

//8.) closures
function createPrinter() {
    return {
        print(word) {
            console.log(word);
        }
    };
}
const obj1 = createPrinter();

//9.) class/object assignment
class printer {
    static print(word) {
        console.log(word);
    }
}
const obj2 = printer;

/*  add syntactically correct logic 
    that can be multiple lines or not
    which can be invoked below.
*/
print_str("I love Javascript!!!");   /* or you can create an instance with same goal of displaying a text: obj.print("I love Javascript!!!");  */

//time spent: 30mins