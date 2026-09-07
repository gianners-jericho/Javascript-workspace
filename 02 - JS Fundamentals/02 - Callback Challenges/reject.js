function reject(arr, callback){
    const finalArr = [];

    for(let i = 0; i<arr.length; i++){
        if(!callback(arr[i])) finalArr.push(arr[i]);
    }

    return finalArr;
}

let result = reject([1,2,3,4,15], function(val) { return val<10; }); //rejects any value that is less than 10
console.log(result); //this should log [15]
