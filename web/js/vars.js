// jQuery
let $video__wrapper = $("#video__wrapper");
let $lockSymbol = $("#lock-symbol");
let $lockSymbolWrapper = $("#lock-symbol__wrapper");
// JS
let video = document.getElementById("video");
// Eyes distance
let prevEyelidDist = 0;
let currEyelidDist = 0;
// Scroll direction: 0 - horizon, 1 - up, -1 - down
let scrollDirection = 0;
// Indexes: 0 - the first blink, 1 - the second one, 2 - difference (ms)
let blinkDates = [0, 0, 0];
let blinkDatesIndex = 0;
// Wheel scroll
let wheelScrollCounter = 0;