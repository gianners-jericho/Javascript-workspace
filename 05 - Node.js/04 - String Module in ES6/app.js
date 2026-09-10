import StringLib from './stringlib.js';

const stringlib = new StringLib();

// 1. Test concat
console.log('Concat:', stringlib.concat("Village", "88")); 

// 2. Test repeat
console.log('Repeat:', stringlib.repeat("ha", 3)); 

// 3. Test toString
const numStr = stringlib.toString(5);
console.log('toString:', numStr, '| Type:', typeof numStr); 

// 4. Test charAt
console.log('charAt:', stringlib.charAt("nice", 2)); 

//time spent: 30mins