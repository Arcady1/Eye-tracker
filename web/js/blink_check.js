// The function checks if the user blinked
function blinkCheck() {
    let k = 2.2; // ! Select a coefficient
    let resetTimer = 500;

    // Filling the blinkDates array
    if ((prevEyelidDist.leftEyeYDist - currEyelidDist.leftEyeYDist > k) || (prevEyelidDist.rightEyeYDist - currEyelidDist.rightEyeYDist > k)) {
        console.log("blink");
        blinkDates[blinkDatesIndex] = new Date().getTime();
        // Blink interval
        blinkDates[2] = Math.abs(blinkDates[1] - blinkDates[0]);
        // Reset blink timer
        if (blinkDates[2] <= resetTimer) {
            console.log(blinkDates[2]);
            // * STATES
            letsScroll = true;
            setNormDistBetweenEyeCenterAndIrisCenter = true;
            makeScroll = makeScroll_();
            wheelScrollCounter == 0;
            showLockSymbol(false);
        }
        // blinkDatesIndex changing
        blinkDatesIndex = changeBlinkIndex();
    }
}
// The function swap blinkDatesIndex
function changeBlinkIndex() {
    return (blinkDatesIndex == 0) ? 1 : 0;
}