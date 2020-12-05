// jQuery
let $video__wrapper = $("#video__wrapper");
let $horizont_button = $("#horizont-button");
// JS
let video = document.getElementById("video");
// ! let normalDist = null;
// ! let setNormalDist = false;
let previousDist, currentDist;
let lock = true;
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