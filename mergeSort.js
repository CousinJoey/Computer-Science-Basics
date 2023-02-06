
function mergeSort(array) {
    if (array.length <= 1) return array;

    let midpoint = Math.floor(array.length/2)

    let left = mergeSort(array.slice(0, midpoint));
    let right = mergeSort(array.slice(midpoint));

    return merge(left, right);
}



function merge(left, right) {
    let sortedArray = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArray.push(left.shift());
        } else {
            sortedArray.push(right.shift());
        }
    };

    return [...sortedArray, ...left, ...right];
}

testArray = [3, 99, 1, 52, 67, 33, 10, 5, 42, 77]


console.log(mergeSort(testArray));