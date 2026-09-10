function EmitRandomNumber(attempt) {
    return new Promise((resolve) => {
        console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

        setTimeout(() => {
            console.log("2 seconds have lapsed.");

            const number = Math.floor(Math.random() * 101);
            console.log(`Random number generated is ${number}.`);
            console.log("- - - - -");

            resolve(number);
        }, 2000);
    });
}

function runAttempts(attempt) {
    return EmitRandomNumber(attempt).then((number) => {
        if (number > 80 || attempt >= 10) {
            return number;
        }
        return runAttempts(attempt + 1);
    });
}

runAttempts(1).then((finalNumber) => {
    console.log(`Done. Final number: ${finalNumber}`);
});
