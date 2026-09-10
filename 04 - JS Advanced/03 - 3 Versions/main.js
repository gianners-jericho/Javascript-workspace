function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function delayCallback(ms, callback) {
    setTimeout(callback, ms);
}


//CALLBACKS ONLY
function EmitRandomNumberCallback(attempt = 1, onComplete) {
    console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

    delayCallback(2000, () => {
        console.log("2 seconds have lapsed.");
        const randomNum = Math.floor(Math.random() * 101);
        console.log(`Random number generated is ${randomNum}.`);
        console.log("- - - - -");

        if (randomNum < 80 && attempt < 10) {
            EmitRandomNumberCallback(attempt + 1, onComplete);
        } else {
            if (typeof onComplete === "function") {
                onComplete();
            }
        }
    });
}


//PROMISES 
function EmitRandomNumberPromise(attempt = 1) {
    console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

    return delay(2000).then(() => {
        console.log("2 seconds have lapsed.");
        const randomNum = Math.floor(Math.random() * 101);
        console.log(`Random number generated is ${randomNum}.`);
        console.log("- - - - -");

        if (randomNum < 80 && attempt < 10) {
            return EmitRandomNumberPromise(attempt + 1);
        }
    });
}


//ASYNC/AWAIT
async function EmitRandomNumberAsync(attempt = 1) {
    console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

    await delay(2000);
    console.log("2 seconds have lapsed.");
    const randomNum = Math.floor(Math.random() * 101);
    console.log(`Random number generated is ${randomNum}.`);
    console.log("- - - - -");

    if (randomNum < 80 && attempt < 10) {
        await EmitRandomNumberAsync(attempt + 1);
    }
}

//EXECUTE ALL
async function main() {
    console.log("APPROACH 1: PURE CALLBACKS");
    await new Promise((resolve) => EmitRandomNumberCallback(1, resolve));

    console.log("APPROACH 2: PROMISES");
    await EmitRandomNumberPromise();

    console.log("APPROACH 3: ASYNC / AWAIT");
    await EmitRandomNumberAsync();

}

main();
