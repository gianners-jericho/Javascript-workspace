import Cases from './Cases.js';
import TrialCourts from './TrialCourts.js';
import { Prosecutors } from './Prosecutors.js';
import { Defendants } from './Defendants.js';

// Test Case 1: Younger than 18
console.log("--- TEST CASE 1 ---");
let case1 = new Cases("Malicious Mischief", 3, 3, 3, 18, 75);
let prosecutor = new Prosecutors("John", 30);
let defendant1 = new Defendants("Girlie", 5);

prosecutor.prosecute(defendant1, case1);
TrialCourts.initiateTrial(defendant1, prosecutor);


// Test Case 2: Age between 18 to 75 (Dec 17, 2020)
console.log("--- TEST CASE 2 ---");
let defendant2 = new Defendants("Onel", 25);

prosecutor.prosecute(defendant2, case1);

// Mocking today's date to Dec 17, 2020 as specified in the test case
let mockToday = new Date(2020, 11, 17); // Month index 11 is December
TrialCourts.initiateTrial(defendant2, prosecutor, mockToday);

//time spent: 20mins