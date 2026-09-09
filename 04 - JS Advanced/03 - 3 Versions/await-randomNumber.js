//Async-Await Version of EmitRandomNumber()
function EmitRandomNumber(attempt) {
    return new Promise(function(resolve) {
        console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

        setTimeout(function() {
            console.log("2 seconds have lapsed.");
            const randomNum = Math.floor(Math.random() * 101);
            console.log(`Random number generated is ${randomNum}.`);
            console.log("- - - - -");

            resolve(randomNum);
        }, 2000);
    });
}

async function runAsyncAwaitVersion(maxAttempts) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const randomNum = await EmitRandomNumber(attempt);

        if (randomNum > 80) {
            console.log(`Success! Generated ${randomNum} (> 80).`);
            return;
        }
    }
    console.log("Reached maximum attempts without exceeding 80.");
}

runAsyncAwaitVersion(10);

//time spent: 20mins