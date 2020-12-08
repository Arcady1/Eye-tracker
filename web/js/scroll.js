// Vars
setterNormDistBetweenEyeCenterAndIrisCenter = setNormDistBetweenEyeCenterAndIrisCenterFunc();
setterCurrentDistBetweenEyeCenterAndIrisCenter = setCurrentDistBetweenEyeCenterAndIrisCenterFunc();
makeScroll = makeScroll_();

function makeScroll_() {
    let norm, cur;
    let upCoef = 0.105;
    let downCoef = -0.130;
    // Scroll direction: 0 - horizon, 1 - up, -1 - down
    let scrollDirection = 0;
    let previousScrollDirection;

    return function makeScroll__() {
        norm = normDistBetweenEyeCenterAndIrisCenter;
        cur = currentDistBetweenEyeCenterAndIrisCenter

        // ! console.log("norm:", norm.toFixed(3), "cur:", cur.toFixed(3));
        // Setting the previousScrollDirection
        previousScrollDirection = scrollDirection;
        // Setting the view direction
        if (cur - norm > upCoef)
            scrollDirection = 1;
        else if (cur - norm < downCoef)
            scrollDirection = -1;
        else
            scrollDirection = 0;
        // Scrolling the webpage only when the direction was changed
        if (previousScrollDirection != scrollDirection)
            webpageScroll();
    }

    function webpageScroll() {
        // ! console.log("diection:", scrollDirection);
        if (scrollDirection == 1)
            scrollPreset(300, -30);
        else if (scrollDirection == -1)
            scrollPreset(300, 30);
    }

    function scrollPreset(duration, length) {
        $('html').animate({
            scrollTop: window.pageYOffset + length
        }, duration, "linear", () => {
            if (scrollDirection != 0) {
                console.log("again");
                scrollPreset(duration, length);
            } else
                console.log("stop");
        });
    }
}
// The function sets the current currentDistBetweenEyeCenterAndIrisCenter AVERAGE value of the distance
function setCurrentDistBetweenEyeCenterAndIrisCenterFunc() {
    // I use a counter to read the average currentDistBetweenEyeCenterAndIrisCenter value 
    let counter = 0;
    let axisCounter = 0;
    let stopCounter = 10;

    return function setCurDist(faceParts) {
        ++counter;
        axisCounter += (faceParts.midwayBetweenEyes.y - faceParts.midwayBetweenIrises.y);
        // ! console.log("cur: " + counter);
        // Update the current average distance
        if (counter == stopCounter) {
            currentDistBetweenEyeCenterAndIrisCenter = axisCounter / counter;
            // Overwrite nested function => reset counter, axisCounter
            setterCurrentDistBetweenEyeCenterAndIrisCenter = setCurrentDistBetweenEyeCenterAndIrisCenterFunc();
        }
    }
}
// The function sets the current normDistBetweenEyeCenterAndIrisCenter AVERAGE value of the distance
function setNormDistBetweenEyeCenterAndIrisCenterFunc() {
    // I use a counter to read the average currentDistBetweenEyeCenterAndIrisCenter value 
    let counter = 0;
    let axisCounter = 0;
    let stopCounter = 20;

    return function setNormDist(faceParts) {
        ++counter;
        axisCounter += (faceParts.midwayBetweenEyes.y - faceParts.midwayBetweenIrises.y);
        // ! console.log("norm: " + counter);
        // Update the norm average distance
        if (counter == stopCounter) {
            normDistBetweenEyeCenterAndIrisCenter = axisCounter / counter;
            // Overwrite nested function => reset counter, axisCounter
            setterNormDistBetweenEyeCenterAndIrisCenter = setNormDistBetweenEyeCenterAndIrisCenterFunc();
            // * STATES
            setNormDistBetweenEyeCenterAndIrisCenter = false;
            makeScroll.state = 1;
        }
    }
}