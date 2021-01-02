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

function blinkCheck(currentLeftEyeDist, currentRightEyeDist) {
    // Significant reduction in the distance between the eyelids (%)
    let k = 25; // ! Select a coefficient
    // Blink interval
    let resetTimer = 500;
    // The difference between previous and current eyelid distance (%)
    let currentEyeDistValue = {
        "leftEyeVal": (currentLeftEyeDist * 100) / blinkEyelidDistArr[blinkIndex]["leftEyeDist"],
        "rightEyeVal": (currentRightEyeDist * 100) / blinkEyelidDistArr[blinkIndex]["rightEyeDist"]
    }

    // ! и не было смещения головы
    if (((100 - currentEyeDistValue.leftEyeVal > k) || (100 - currentEyeDistValue.rightEyeVal > k)) && (blinkIndex == 0)) {
        console.log("close");

        blinkDates[0] = new Date().getTime();
        blinkIndex = 1;
    } else if (((100 - currentEyeDistValue.leftEyeVal < -k) || (100 - currentEyeDistValue.rightEyeVal < -k)) && (blinkIndex == 1)) {
        console.log("open");

        blinkDates[1] = new Date().getTime();
        blinkIndex = 2;
        // Blink interval
        blinkDates[2] = Math.abs(blinkDates[1] - blinkDates[0]);

        // Reset blink timer; this "if" works when the user made double blink
        if (blinkDates[2] <= resetTimer) {
            console.log(blinkDates[2]);
        }
        // Reset blinkIndex
        // ! blinkIndex = 0; 
    }

    // Filling the blinkDates array
    // if ((prevEyelidDist.leftEyeYDist - currEyelidDist.leftEyeYDist > k) || (prevEyelidDist.rightEyeYDist - currEyelidDist.rightEyeYDist > k)) {
    //     console.log("blink");
    //     blinkDates[blinkDatesIndex] = new Date().getTime();
    //     // Blink interval
    //     blinkDates[2] = Math.abs(blinkDates[1] - blinkDates[0]);
    //     // Reset blink timer; this "if" works when the user made double blink
    //     if (blinkDates[2] <= resetTimer) {
    //         console.log(blinkDates[2]);
    //         setScrollDirectionAndMakeScroll();
    //     }
    //     // blinkDatesIndex changing
    //     blinkDatesIndex = changeBlinkIndex();
    // }
}

// The function swap blinkDatesIndex
function changeBlinkIndex() {
    return (blinkDatesIndex == 0) ? 1 : 0;
}