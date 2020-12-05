// The function checks if the user blinked
function blinkCheck() {
    let k = 2; // ! ПОДОБРАТЬ КОЭФФИЦИЕНТ
    let resetTimer = 500;

    // Filling the blinkDates array
    if ((previousDist.leftEyeYDist - currentDist.leftEyeYDist > k) || (previousDist.rightEyeYDist - currentDist.rightEyeYDist > k)) {
        console.log("Blink!");
        blinkDates[blinkDatesIndex] = new Date().getTime();
        // Blink interval
        if (blinkDatesIndex == 1) {
            blinkDates[2] = blinkDates[1] - blinkDates[0];
            // Reset blink timer
            if (blinkDates[2] > resetTimer)
                console.log("Reset");
            else
                console.log(blinkDates[2]);
        }
        // blinkDatesIndex changing
        blinkDatesIndex = changeBlinkIndex();
    }
}
// The function swap blinkDatesIndex
function changeBlinkIndex() {
    return (blinkDatesIndex == 0) ? 1 : 0;
}