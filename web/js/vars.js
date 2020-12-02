// jQuery
let $video__wrapper = $("#video__wrapper");
let $horizont_button = $("#horizont-button");
// JS
let video = document.getElementById("video");
let normalDist = null;
let setNormalDist = false;
let currentDist = null;
let lock = true;
// ! TEMP
let up_ = 0;
let down_ = 0;
let stop_ = 0;
let timerID;
let currentDirection;
let pastDirecion;