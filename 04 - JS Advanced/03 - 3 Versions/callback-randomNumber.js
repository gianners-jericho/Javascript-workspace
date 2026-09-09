//callback version of EmitRandomNumber()
function EmitRandomNumber(attempt, maxAttempts, callback) {
    if (attempt > maxAttempts) {
        console.log("Reached maximum attempts.");
        return;
    }

    console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

    setTimeout(function() {
        console.log("2 seconds have lapsed.");
        const randomNum = Math.floor(Math.random() * 101); // 0 to 100
        console.log(`Random number generated is ${randomNum}.`);
        console.log("- - - - -");

        if (randomNum <= 80 && attempt < maxAttempts) {
            // Recursive callback call for next attempt
            EmitRandomNumber(attempt + 1, maxAttempts, callback);
        } else if (callback) {
            callback(randomNum);
        }
    }, 2000);
}

// Start execution
EmitRandomNumber(1, 10, function(finalNum) {
    if (finalNum > 80) {
        console.log(`Success! Generated ${finalNum} (> 80).`);
    } else {
        console.log("Stopped without reaching > 80.");
    }
});

//time spent: 30mins