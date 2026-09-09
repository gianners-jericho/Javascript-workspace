
//functional
function print_str(str) {
    console.log(str);
}
print_str("1. I love Javascript!!!");


//object method
const printerObj = {
    print: function(str) {
        console.log(str);
    }
};
printerObj.print("2. I love Javascript!!!");


//constructor function instance method
function ConstructorPrinter() {
    this.print = function(str) {
        console.log(str);
    };
}
const constructorInstance = new ConstructorPrinter();
constructorInstance.print("3. I love Javascript!!!");


//prototype method
function ProtoPrinter() {}
ProtoPrinter.prototype.print = function(str) {
    console.log(str);
};
const protoInstance = new ProtoPrinter();
protoInstance.print("4. I love Javascript!!!");


//ES6 classes and instance print method
class ClassPrinter {
    print(str) {
        console.log(str);
    }
}
const classInstance = new ClassPrinter();
classInstance.print("5. I love Javascript!!!");


//callbacks
function executePrint(str, callback) {
    callback(str);
}
executePrint("6. I love Javascript!!!", function(message) {
    console.log(message);
});


//higher order function
function generatePrinter(prefix) {
    return function(str) {
        console.log(`${prefix} ${str}`);
    };
}
const customPrinter = generatePrinter("7.");
customPrinter("I love Javascript!!!");


//immediate functions
(function(str) {
    console.log(str);
})("8. I love Javascript!!!");


//document onclick event handler
document.onclick = function() {
    console.log("9. I love Javascript!!!");
};
