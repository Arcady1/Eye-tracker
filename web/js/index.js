let model_pred = require('./model_pred.js');

// IIFE
(function () {
    let video = document.getElementById("video");

    // Getting navigator.getUserMedia
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    // Request user camera access
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(stream => {
            video.srcObject = stream;
            video.play();
        }).catch(() => {
            console.log("ERROR: No camera access");
        })
        .then(() => {
            return model_pred.modelLoading();
        })
        .then((model) => {
            model_pred.makePredictions(model);
        })
        .catch(() => {
            console.log("ERROR: Model is not loaded");
        });
})();



// TODO Stop scroll while scrolling the mouse wheel
// window.addEventListener("wheel", () => {
//     wheelScrollCounter += 1;
//     // * STATES
//     if (wheelScrollCounter == 1)
//         scrollDirection = 0;
// });

// // The function displays the lock / unlock symbol => changing $lockSymbol css class
// function showLockSymbol(toLock = true) {
//     // Make it visible
//     $lockSymbolWrapper.css({
//         "visibility": "visible",
//         "opacity": 1
//     });
//     // Show the lock / unlock symbol
//     if (toLock == true) {
//         $lockSymbol.removeClass("unlock-active");
//         $lockSymbol.addClass("lock-active");
//     } else {
//         $lockSymbol.removeClass("lock-active");
//         $lockSymbol.addClass("unlock-active");
//     }
//     // Make it hidden
//     setTimeout(() => {
//         $lockSymbolWrapper.css({
//             "visibility": "hidden",
//             "opacity": 0
//         });
//     }, lockSymbolWrapperHiddenTimer);
// }

// function changeEyeWatchSymbol(unwatchSymbol = true) {
//     if (unwatchSymbol == true) {
//         $eyeSymbol.removeClass("eye-symbol-watch");
//         $eyeSymbol.addClass("eye-symbol-unwatch");
//     } else {
//         $eyeSymbol.removeClass("eye-symbol-unwatch");
//         $eyeSymbol.addClass("eye-symbol-watch");
//     }
// }

// TODO face_points_render


// TODO model_pred.js


// TODO blink_check.js


// TODO extra_func.js


// TODO scroll_and_setDist.js

// TODO vars.js
// // jQuery
// let $video__wrapper = $("#video__wrapper");
// // Lock symbol
// let $lockSymbol = $("#lock-symbol");
// let $lockSymbolWrapper = $("#lock-symbol__wrapper");
// let lockSymbolWrapperHiddenTimer = parseFloat($lockSymbolWrapper.css("transition-duration")) * 1000;
// // Eye symbol
// let $eyeSymbol = $("#index__eye-symbol");
// // JS
// ! let video = document.getElementById("video");
// // Scroll direction: 0 - horizon, 1 - up, -1 - down
// ! let scrollDirection = 0;
// // Indexes: 0 - the first blink, 1 - the second one, 2 - difference (ms)
// ! let blinkDates = [0, 0, 0];
// ! let blinkDatesIndex = 0;
// // Array of distances between eyelids { "leftEyeDist", rightEyeDist" }
// ! let blinkEyelidDistArr = [0, 0, 0];
// ! let blinkIndex = 0;
// // Fixed silhouette positions { "top", "botom" }
// ! let fixedSilhouettePos = 0;
// // Wheel scroll
// let wheelScrollCounter = 0;
// // ScrollTimer
// let timerScroll;
// //  It is used for the correct operation of the function silhouetteOffsetBoolean. Allows to set the direction of scrolling by head movement
// ! let setScrollDirection = false;