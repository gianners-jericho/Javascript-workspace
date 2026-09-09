// Use Promises. A program that generates a number. If below 80, generate again. Loop until a number above 80 is generated.
function generateRandomNumber(callback) {
    const result = setTimeout(function() {
        console.log("2s have passed.")
        const number = Math.floor(Math.random() * 100) + 1;
        callback(number)
    }, 2000)
    
    return result;
}

let maxAttempts = 10;
let attempts = 1;

function generate(){
    const promise = new Promise(function(resolve, reject) {
        console.log(`Attempt ${attempts}:`)
        generateRandomNumber(function(number) {
            console.log("Generated Number is ", number);
            number <= 80 ? resolve() : reject();
        })
    })

    promise.then(function(){
        attempts++;
        if(attempts <= maxAttempts){
            generate();
        }
    }, function() {
        console.log("Complete!")
    })
}
generate();