function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function EmitRandomNumber() {
    let number;
    let attempt;

    for (let attempt = 1; attempt <= 10; attempt++) {
        console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

        await delay(2000);
        console.log("2 seconds have lapsed.");

        number = Math.floor(Math.random() * 101);
        console.log(`Random number generated is ${number}.`);
        console.log("- - - - -");

        if (number > 80) {
            break;
        }
    }

    console.log(`Done. Final number: ${number}`);
}

EmitRandomNumber();
