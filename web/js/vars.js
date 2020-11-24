// jQuery
let $video__wrapper = $("#video__wrapper");
let $horizont_button = $("#horizont-button");
let $horizont_point = $("#horizont-point");
let $click_pos = $("#fix-pos");
// JS
let video = document.getElementById("video");
let normalDist = null;
let setNormalDist = false;
// ! TEMP
let currentDist = null;
let up_ = 0;
let down_ = 0;
let stop_ = 0;
let timerID;