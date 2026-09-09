// Use Callbacks. A program that generates a number. If below 80, generate again. Loop until a number above 80 is generated.
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
    generateRandomNumber(function(number){
        console.log(`Attempt ${attempts}:`)
        console.log("Generated Number is ", number);
        attempts++;

        if((number <= 80) && (attempts <= maxAttempts)){
            generate();
        } 
        else {
            console.log("Complete!")
        }
    });
}
generate();