function min(a, b) {
    return (a <= b) ? a : b;
}

function max(a, b) {
    return (a >= b) ? a : b;
}

function centerPosition(first, second, axis) {
    return (min(first[axis], second[axis]) + (Math.abs(first[axis] - second[axis]) / 2));
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