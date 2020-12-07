// jQuery
let $video__wrapper = $("#video__wrapper");
// JS
let video = document.getElementById("video");
// The normal distance between the eye center and the iris
let normDistBetweenEyeCenterAndIrisCenter;
let setNormDistBetweenEyeCenterAndIrisCenter = false;
let currentDistBetweenEyeCenterAndIrisCenter;

let setterNormDistBetweenEyeCenterAndIrisCenter = setNormDistBetweenEyeCenterAndIrisCenterFunc();
let setterCurrentDistBetweenEyeCenterAndIrisCenter = setCurrentDistBetweenEyeCenterAndIrisCenterFunc();
// Eyes distance
let prevEyelidDist = 0;
let currEyelidDist = 0;
// Whether to scroll a webpage
let scrollState = false;
// Scroll direction: 0 - horizon, 1 - up, -1 - down
let scrollDirection = 0;
// Indexes: 0 - the first blink, 1 - the first one, 2 - difference (ms)
let blinkDates = [0, 0, 0];
let blinkDatesIndex = 0;
// ! TEMP
// ! let up_ = 0;
// ! let down_ = 0;
// ! let stop_ = 0;
// ! let timerID;
// ! let currentDirection;
// ! let pastDirecion;







function makeScroll() {
    console.log("norm:", normDistBetweenEyeCenterAndIrisCenter, "cur:", currentDistBetweenEyeCenterAndIrisCenter);
    // TODO Проверяем сдвиг по оси OY текущего положения зрачка относитнльно нормального
    // TODO Делаем скролл в нужном напрвлении
    // TODO Если положение глаз в 0 => scrollState = false
}

function setCurrentDistBetweenEyeCenterAndIrisCenterFunc() {
    // I use a counter to read the average currentDistBetweenEyeCenterAndIrisCenter value 
    let counter = 0;
    let axisCounter = 0;
    let stopCounter = 10;

    return function setCurDist(faceParts) {
        ++counter;
        axisCounter += (faceParts.midwayBetweenEyes.y - faceParts.midwayBetweenIrises.y);
        console.log("cur: " + counter);
        // Update the current average distance
        if (counter == stopCounter) {
            currentDistBetweenEyeCenterAndIrisCenter = axisCounter / counter;
            setterCurrentDistBetweenEyeCenterAndIrisCenter = setCurrentDistBetweenEyeCenterAndIrisCenterFunc();
        }
    }
}

function setNormDistBetweenEyeCenterAndIrisCenterFunc() {
    // I use a counter to read the average currentDistBetweenEyeCenterAndIrisCenter value 
    let counter = 0;
    let axisCounter = 0;
    let stopCounter = 20;

    return function setNormDist(faceParts) {
        ++counter;
        axisCounter += (faceParts.midwayBetweenEyes.y - faceParts.midwayBetweenIrises.y);
        console.log("norm: " + counter);
        // Update the norm average distance
        if (counter == stopCounter) {
            normDistBetweenEyeCenterAndIrisCenter = axisCounter / counter;
            setterNormDistBetweenEyeCenterAndIrisCenter = setNormDistBetweenEyeCenterAndIrisCenterFunc();
            // ? STATES
            setNormDistBetweenEyeCenterAndIrisCenter = false;
            makeScroll.state = 1;
        }
    }
}