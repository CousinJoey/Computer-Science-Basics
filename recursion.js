// not recursive method

function fib(n) {

    let array = []; 

    for (let i = 0; i < (n); i++) {
        if (i === 0) {
            array.push(0)
        } else if (i === 1) {
            array.push(1)
        } else {
            array.push(array[i-2]+array[i-1]);
        }
    }

    console.log(array);

}

// recursive method

function fibRec(n, array = [0,1]) {

    if (array.length === n) {
        console.log(array);
        return
    } 
    
    array.push(array[array.length -2] + array[array.length - 1])
    
    fibRec(n, array);

}