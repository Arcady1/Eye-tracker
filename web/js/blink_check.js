// The function checks if the user blinked
// function blinkCheck() {
//     let k = 2.2; // ! Select a coefficient
//     let resetTimer = 500;

//     // Filling the blinkDates array
//     if ((prevEyelidDist.leftEyeYDist - currEyelidDist.leftEyeYDist > k) || (prevEyelidDist.rightEyeYDist - currEyelidDist.rightEyeYDist > k)) {
//         console.log("blink");
//         blinkDates[blinkDatesIndex] = new Date().getTime();
//         // Blink interval
//         blinkDates[2] = Math.abs(blinkDates[1] - blinkDates[0]);
//         // Reset blink timer; this "if" works when the user made double blink
//         if (blinkDates[2] <= resetTimer) {
//             console.log(blinkDates[2]);
//             setScrollDirectionAndMakeScroll();
//         }
//         // blinkDatesIndex changing
//         blinkDatesIndex = changeBlinkIndex();
//     }
// }

// !


function blinkCheck(currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist) {
    // Significant reduction in the distance between the eyelids (%)
    const k_close = 18;
    const k_open = 6;
    // Blink interval
    const resetTimer = 500;
    // The difference between previous and current eyelid distance (%)
    let currentEyeDistValue = {
        "leftEyeVal": (currentLeftEyeDist * 100) / blinkEyelidDistArr[blinkIndex]["leftEyeDist"],
        "rightEyeVal": (currentRightEyeDist * 100) / blinkEyelidDistArr[blinkIndex]["rightEyeDist"]
    }

    // Checking for head displacement
    silhouetteOffsetBoolean(currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist);

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
            if (scrollDirection != 0)
                scrollDirection = 0;
            else {
                // Setting the scrollDirection
                setScrollDirection = true;
                silhouetteOffsetBoolean(currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist);
                // It shows the unlock sign
                showLockSymbol(false);
            }
        }

        blinkDatesIndex = changeBlinkIndex();
        blinkIndex = 0;
    }
}

// The function swap blinkDatesIndex
function changeBlinkIndex() {
    return (blinkDatesIndex == 0) ? 1 : 0;
}

// The function checks if there was a significant displacement of the head
function silhouetteOffsetBoolean(currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist) {
    // Significant displacement of a person's face (%)
    const k = 2.5;
    let offsetValueTop = (fixedSilhouetteDist.top * 100) / currentSilhouetteDist.top;
    let offsetValueBottom = (fixedSilhouetteDist.bottom * 100) / currentSilhouetteDist.bottom;

    /* If setScrollDirection == true, the function sets scrollDirection by head movement, otherwise checks 
    the face offset to reset blinkIndex and set blinkEyelidDistArr*/
    if (setScrollDirection) {
        // Scroll up
        if ((100 - offsetValueTop < -k) || (100 - offsetValueBottom < -k)) {
            scrollDirection = 1;
            // Beginnig of scroll
            setScrollDirectionAndMakeScroll();
            setScrollDirection = false;
        }
        // Scroll down
        else if ((100 - offsetValueBottom > k) || (100 - offsetValueTop > k)) {
            scrollDirection = -1;
            // Beginning of scroll
            setScrollDirectionAndMakeScroll();
            setScrollDirection = false;
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