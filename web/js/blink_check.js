let scroll_and_setDist = require('./scroll_and_setDist.js');
let vars = require('./vars.js');

// The function checks if the user blinked
function blinkCheck() {
    // Significant reduction in the distance between the eyelids (%)
    const k_close = 25;
    const k_open = 5;
    // Blink interval
    const resetTimer = 500;
    // The difference between previous and current eyelid distance (%)
    let currentEyeDistValue = {};
    // Indexes: 0 - the first blink, 1 - the second one, 2 - difference (ms)
    let blinkDates = [0, 0, 0];
    let blinkDatesIndex = 0;
    // The index of blinkEyelidDistArr
    let blinkIndex = 0;

    return function (blinkEyelidDistArr, fixedSilhouettePos, currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist) {
        // The function checks if the user blinked
        currentEyeDistValue = {
            "leftEyeVal": (currentLeftEyeDist * 100) / blinkEyelidDistArr[0]["leftEyeDist"],
            "rightEyeVal": (currentRightEyeDist * 100) / blinkEyelidDistArr[0]["rightEyeDist"]
        }

        console.log(100 - currentEyeDistValue.leftEyeVal, 100 - currentEyeDistValue.rightEyeVal);

        // Checking for head displacement
        silhouetteOffsetBoolean(blinkEyelidDistArr, fixedSilhouettePos, currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist);
        // Checking for eyes closing and opening
        if (((100 - currentEyeDistValue.leftEyeVal > k_close) || (100 - currentEyeDistValue.rightEyeVal > k_close)) && (blinkIndex == 0)) {
            console.log("close");
            blinkIndex = 1;
        } else if (((100 - currentEyeDistValue.leftEyeVal < -k_open) || (100 - currentEyeDistValue.rightEyeVal < -k_open)) && (blinkIndex == 1)) {
            console.log("open");
            blinkDates[blinkDatesIndex] = new Date().getTime();
            blinkIndex = 2;

            // Blink interval
            blinkDates[2] = Math.abs(blinkDates[1] - blinkDates[0]);

            // Reset blink timer; this "if" works when the user made double blink
            if (blinkDates[2] <= resetTimer) {
                console.log(blinkDates[2]);
                // If the page is scrolling, the double blink stops it, otherwise it starts scrolling
                if (vars.scrollDirection != 0)
                    vars.scrollDirection = 0;
                else {
                    // Setting the vars.scrollDirection
                    vars.setScrollDirection = true;
                    silhouetteOffsetBoolean(fixedSilhouettePos, currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist);
                    // It shows the unlock sign
                    console.log("showLockSymbol(false)");
                    // ! showLockSymbol(false);
                }
            }

            blinkDatesIndex = changeBlinkIndex(blinkDatesIndex);
            blinkIndex = 0;
        }

        // The function swap blinkDatesIndex
        function changeBlinkIndex(blinkDatesIndex_) {
            return (blinkDatesIndex_ == 0) ? 1 : 0;
        }

        // The function checks if there was a significant displacement of the head
        function silhouetteOffsetBoolean(blinkEyelidDistArr, fixedSilhouettePos, currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist) {
            // Significant displacement of a person's face (%)
            const k = 2.5;
            let offsetValueTop = (fixedSilhouetteDist.top * 100) / currentSilhouetteDist.top;
            let offsetValueBottom = (fixedSilhouetteDist.bottom * 100) / currentSilhouetteDist.bottom;

            /* If vars.setScrollDirection == true, the function sets vars.scrollDirection by head movement, otherwise checks 
            the face offset to reset blinkIndex and set blinkEyelidDistArr*/
            if (vars.setScrollDirection) {
                // Scroll up
                if ((100 - offsetValueTop < -k) || (100 - offsetValueBottom < -k)) {
                    vars.scrollDirection = 1;
                    // Beginnig of scroll
                    scroll_and_setDist.setScrollDirectionAndMakeScroll();
                    vars.setScrollDirection = false;
                }
                // Scroll down
                else if ((100 - offsetValueBottom > k) || (100 - offsetValueTop > k)) {
                    vars.scrollDirection = -1;
                    // Beginning of scroll
                    scroll_and_setDist.setScrollDirectionAndMakeScroll();
                    vars.setScrollDirection = false;
                }
            } else {
                if ((100 - offsetValueTop < -k) || (100 - offsetValueTop > k) || (100 - offsetValueBottom < -k) || (100 - offsetValueBottom > k)) {
                    console.log("New direction");

                    // Setting a the default silhouette position
                    fixedSilhouettePos.top = currentSilhouetteDist.top;
                    fixedSilhouettePos.bottom = currentSilhouetteDist.bottom;
                    // Setting the blinkIndex
                    blinkIndex = 0;

                    console.log(currentLeftEyeDist, currentRightEyeDist);
                    // Setting a the default eyes distance
                    blinkEyelidDistArr[blinkIndex] = {
                        "leftEyeDist": currentLeftEyeDist,
                        "rightEyeDist": currentRightEyeDist
                    }
                }
            }
        }
    }
}

module.exports = {
    blinkCheck: blinkCheck()
}