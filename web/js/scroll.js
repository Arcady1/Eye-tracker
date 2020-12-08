// Vars
setterNormDistBetweenEyeCenterAndIrisCenter = setNormDistBetweenEyeCenterAndIrisCenterFunc();
setterCurrentDistBetweenEyeCenterAndIrisCenter = setCurrentDistBetweenEyeCenterAndIrisCenterFunc();

function makeScroll() {
    console.log("norm:", normDistBetweenEyeCenterAndIrisCenter.toFixed(3), "cur:", currentDistBetweenEyeCenterAndIrisCenter.toFixed(3));
    // TODO Проверяем сдвиг по оси OY текущего положения зрачка относитнльно нормального
    // TODO Делаем скролл в нужном напрвлении
    // TODO Если положение глаз в 0 => scrollState = false
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