// Callback
// const randomNumber = function () {
//     return Math.floor(Math.random() * 101);
// }

// function EmitRandomNumber(callback){
//     let attempt = 1;

//     function getRandomNumber(){
//         console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

//         setTimeout(function () {
//             console.log("2 seconds have lapsed");

//             const number = callback();

//             console.log(`Random number generated is ${number}`);
//             console.log("- - - - -");

//             if (number < 80 && attempt < 10){
//                 attempt++
//                 getRandomNumber();
//             }
//         }, 2000);
//     }
//     getRandomNumber();
// }

// EmitRandomNumber(randomNumber)

// Promise
// const randomNumber = function() {
//     return Math.floor(Math.random() * 101);
// }

// function EmitRandomNumber(callback){
//     let attempt = 1;

//     function getRandomNumber(){
//         console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

//         new Promise(function (resolve) {
//             setTimeout(function () {
//                 console.log("2 seconds have lapsed");
//                 resolve(callback());
//             }, 2000);
//         }).then(function (number) {
//             console.log(`Random number generated is ${number}`);
//             console.log("- - - - -");

//             if (number < 80 && attempt < 10) {
//                 attempt++
//                 getRandomNumber()
//             }
//         });
//     }
//     getRandomNumber();
// }

// Async and Await
const randomNumber = function () {
    return Math.floor(Math.random() * 101);
}

function wait() {
    return new Promise(function (resolve){
        setTimeout(resolve, 2000);
    });
}

async function EmitRandomNumber(callback) {
   for (let attempt = 1; attempt <= 10; attempt++) {
        console.log(`Attempt #${attempt}. EmitRandomNumber is called.`);

        await wait();

        console.log("2 seconds have lapsed");

        const number = callback();

        console.log(`Random number generated is ${number}`);
        console.log("- - - - -");

        if (number > 80){
            break;
        }
   }
}

EmitRandomNumber(randomNumber);