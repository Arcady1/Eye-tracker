// jQuery
let $video__wrapper = $("#video__wrapper");
// JS
let video = document.getElementById("video");
// The normal distance between the eye center and the iris
let normDistBetweenEyeCenterAndIrisCenter;
let setNormDistBetweenEyeCenterAndIrisCenter = false;
let currentDistBetweenEyeCenterAndIrisCenter;
// Functions (nested functions)
let setterNormDistBetweenEyeCenterAndIrisCenter;
let setterCurrentDistBetweenEyeCenterAndIrisCenter;
let makeScroll;
// Eyes distance
let prevEyelidDist = 0;
let currEyelidDist = 0;
// Whether to scroll a webpage
let letsScroll = false;
// Scroll direction: 0 - horizon, 1 - up, -1 - down
let scrollDirection = 0;
// Indexes: 0 - the first blink, 1 - the second one, 2 - difference (ms)
let blinkDates = [0, 0, 0];
let blinkDatesIndex = 0;