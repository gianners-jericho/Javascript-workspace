//promise version of EmitRandomNumber()
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

function runPromiseVersion(attempt, maxAttempts) {
    if (attempt > maxAttempts) {
        console.log("Reached maximum attempts.");
        return;
    }

    EmitRandomNumber(attempt).then(function(randomNum) {
        if (randomNum <= 80 && attempt < maxAttempts) {
            runPromiseVersion(attempt + 1, maxAttempts);
        } else if (randomNum > 80) {
            console.log(`Success! Generated ${randomNum} (> 80).`);
        } else {
            console.log("Stopped without reaching > 80.");
        }
    });
}

runPromiseVersion(1, 10);

//time spent: 30mins