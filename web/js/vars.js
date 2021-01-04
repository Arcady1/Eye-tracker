let scrollDirection = 0;
<<<<<<< HEAD
let setScrollDirection = false;
=======
// Indexes: 0 - the first blink, 1 - the second one, 2 - difference (ms)
let blinkDates = [0, 0, 0];
let blinkDatesIndex = 0;
// Array of distances between eyelids { "leftEyeDist", rightEyeDist" }
let fixedEyelidDist = 0;
let blinkIndex = 0;
// Fixed silhouette positions { "top", "botom" }
let fixedSilhouettePos = 0;
// Wheel scroll
let wheelScrollCounter = 0;
// ScrollTimer
>>>>>>> develop-head-movement-to-scroll
let timerScroll;

module.exports = {
    scrollDirection: scrollDirection,
    setScrollDirection: setScrollDirection,
    timerScroll: timerScroll
}