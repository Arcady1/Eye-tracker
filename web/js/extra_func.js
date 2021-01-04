function min(a, b) {
    return (a <= b) ? a : b;
}

function max(a, b) {
    return (a >= b) ? a : b;
}

function maxInArrayOfArrays(arr, indexInSubArr) {
    let max = -Infinity;

    arr.forEach(element => {
        if (element[indexInSubArr] > max)
            max = element[indexInSubArr];
    });

    return max;
}

function minInArrayOfArrays(arr, indexInSubArr) {
    let min = Infinity;

    arr.forEach(element => {
        if (element[indexInSubArr] < min)
            min = element[indexInSubArr];
    });

    return min;
}

module.exports = {
    min: min,
    max: max,
    maxInArrayOfArrays: maxInArrayOfArrays,
    minInArrayOfArrays: minInArrayOfArrays
}