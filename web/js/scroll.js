// Vars
setterNormDistBetweenEyeCenterAndIrisCenter = setNormDistBetweenEyeCenterAndIrisCenterFunc();
setterCurrentDistBetweenEyeCenterAndIrisCenter = setCurrentDistBetweenEyeCenterAndIrisCenterFunc();
makeScroll = makeScroll_();

function makeScroll_() {
    let norm, cur;
    let upCoef = 0.105;
    let downCoef = -0.150;
    // Scroll direction: 0 - horizon, 1 - up, -1 - down
    let scrollDirection = 0;
    // Whether to scroll a webpage
    let scrollState = false;

    return function makeScroll__() {
        norm = normDistBetweenEyeCenterAndIrisCenter;
        cur = currentDistBetweenEyeCenterAndIrisCenter

        console.log("norm:", norm.toFixed(3), "cur:", cur.toFixed(3));
        if (cur - norm > upCoef)
            scrollDirection = 1;
        else if (cur - norm < downCoef)
            scrollDirection = -1;
        else
            scrollDirection = 0;
        console.log(scrollDirection);
        
        // TODO Делаем скролл в нужном напрвлении
        // TODO Если положение глаз в 0 => scrollState = false
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