function forEach(arr, callback){
    for(let i = 0; i < arr.length; i++){
        arr[i] = callback(arr[i]);
    }

    return arr;
}

let result = forEach([1,2,3,4,5], function(num) { return num*2; });
console.log(result); //this should log [2,4,6,8,10]