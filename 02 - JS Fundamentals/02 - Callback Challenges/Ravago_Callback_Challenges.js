function foreach(arr, callback) {
    for (let i = 0; i < arr.length; i++){
        arr[i] = callback(arr[i]);
    };

    return arr;
}

function filter (arr, callback) {
    let result = [];

    for (let i = 0; i < arr.length; i++){
        if(callback(arr[i])){
            result.push(arr[i])
        };
    };

    return result;
}

function filter (arr, callback) {
    let result = [];

    for (let i = 0; i < arr.length; i++){
        if(!callback(arr[i])){
            result.push(arr[i])
        };
    };

    return result;
}