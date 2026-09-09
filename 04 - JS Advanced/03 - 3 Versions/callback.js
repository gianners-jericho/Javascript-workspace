// VERSION 1: pure callbacks
// setTimeout is JS's built-in delay - it schedules a callback to run once
// its timer (measured against the system clock/Date under the hood) fires.

function EmitRandomNumber(attempt, onDone) {
    console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

    setTimeout(function() {
        console.log("2 seconds have lapsed.");

        const number = Math.floor(Math.random() * 101);
        console.log(`Random number generated is ${number}.`);
        console.log("- - - - -");

        if (number > 80 || attempt >= 10) {
            onDone(number);
        } else {
            EmitRandomNumber(attempt + 1, onDone);
        }
    }, 2000);
}

EmitRandomNumber(1, function(finalNumber) {
    console.log(`Done. Final number: ${finalNumber}`);
});
