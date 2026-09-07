function foreach(arr, operation){
    for (var i = 0; i < arr.length; i++){
        arr[i] = operation(arr[i]);
    }

    return arr;
}

function filter(arr, operation){
    let res = [];
    for (var i = 0; i < arr.length; i++){
        if (operation(arr[i])){
            res.push(arr[i]);
        }
    }
    return res;
}

function reject(arr, operation){
    let res = [];
    for (var i = 0; i < arr.length; i++){
        if (!(operation(arr[i]))){
            res.push(arr[i]);
        }
    }
    return res;
}