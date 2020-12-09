// Vars
setterNormDistBetweenEyeCenterAndIrisCenter = setNormDistBetweenEyeCenterAndIrisCenterFunc();
setterCurrentDistBetweenEyeCenterAndIrisCenter = setCurrentDistBetweenEyeCenterAndIrisCenterFunc();

function makeScroll_() {
    let norm, cur;
    let upCoef = 0.105;
    let downCoef = -0.130;
    let previousScrollDirection;
    scrollDirection = 0;

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
        if (scrollDirection == 1)
            scrollPreset(200, -15);
        else if (scrollDirection == -1)
            scrollPreset(200, 15);
    }

    function scrollPreset(duration, length) {
        $('html').animate({
            scrollTop: window.pageYOffset + length
        }, duration, "linear", () => {
            // If scroll has reached the beginning or end of the page
            if ((window.pageYOffset == 0) || (window.pageYOffset == document.documentElement.scrollHeight - document.body.clientHeight))
                resetScrollStates();
            // If the view direction wasn't changed
            else if ((scrollDirection == previousScrollDirection) && (scrollDirection != 0)) {
                console.log("direction: " + scrollDirection);
                scrollPreset(duration, length);
            }
            // If the view direction was changed to the opposite
            else
                resetScrollStates();
        });
    }
}
// The function sets the current currentDistBetweenEyeCenterAndIrisCenter AVERAGE value of the distance
function setCurrentDistBetweenEyeCenterAndIrisCenterFunc() {
    // I use a counter to read the average currentDistBetweenEyeCenterAndIrisCenter value 
    let counter = 0;
    let axisCounter = 0;
    let stopCounter = 20;

    return function setCurDist(faceParts) {
        ++counter;
        axisCounter += (faceParts.midwayBetweenEyes.y - faceParts.midwayBetweenIrises.y);
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
// Reset scroll states
function resetScrollStates() {
    letsScroll = false;
    scrollDirection = 0;
    console.log("stop");
}