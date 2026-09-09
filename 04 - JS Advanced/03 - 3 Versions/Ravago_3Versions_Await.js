// Use async/await. A program that generates a number. If below 80, generate again. Loop until a number above 80 is generated.
async function generateRandomNumber() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log("2s have passed.")
            const number = Math.floor(Math.random() * 100) + 1;
            resolve(number);
        }, 2000)
    })
}

let maxAttempts = 10;
let attempts = 1;

for(attempts; attempts <= maxAttempts; attempts++){
    console.log(`Attempt ${attempts}:`);
    const result = await generateRandomNumber();
    console.log("Generated Number is ", result);
    if(result > 80){
        console.log("Complete!");
        break;
    }
}