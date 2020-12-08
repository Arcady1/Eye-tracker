function min(a, b) {
    return (a <= b) ? a : b;
}

function max(a, b) {
    return (a >= b) ? a : b;
}

function centerPosition(first, second, axis) {
    return (min(first[axis], second[axis]) + (Math.abs(first[axis] - second[axis]) / 2));
}