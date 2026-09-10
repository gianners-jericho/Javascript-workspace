const stringLib = require('./stringlib')();

// 1. Test concat
console.log('Concat:', stringLib.concat("Village", "88")); 

// 2. Test repeat
console.log('Repeat:', stringLib.repeat("ha", 3)); 

// 3. Test toString
const numStr = stringLib.toString(5);
console.log('toString:', numStr, '| Type:', typeof numStr); 

// 4. Test charAt
console.log('charAt:', stringLib.charAt("nice", 2)); 

//time spent: 30mins