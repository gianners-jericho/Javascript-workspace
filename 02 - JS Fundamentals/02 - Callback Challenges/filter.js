function filter(arr, callback){
    const finalArr = [];

    for(let i = 0; i<arr.length; i++){
        if(callback(arr[i])) finalArr.push(arr[i]);
    }

    return finalArr;
}

let result = filter([1,2,3,4,15], function(val) { return val<10; }); //this filters each value in the array and only allows values that are less than 10
console.log(result); //this should log [1,2,3,4]