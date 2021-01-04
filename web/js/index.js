let model_pred = require('./model_pred.js');
let vars = require('./vars.js');

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



// Stop scroll while scrolling the mouse wheel
window.addEventListener("wheel", () => {
    vars.wheelScrollCounter += 1;
    // * STATES
    if (vars.wheelScrollCounter == 1)
        vars.scrollDirection = 0;
});

// TODO vars.js
// // jQuery
// let $video__wrapper = $("#video__wrapper");
// // Lock symbol
// ! let $lockSymbol = $("#lock-symbol");
// ! let $lockSymbolWrapper = $("#lock-symbol__wrapper");
// ! let lockSymbolWrapperHiddenTimer = parseFloat($lockSymbolWrapper.css("transition-duration")) * 1000;
// // Eye symbol
// let $eyeSymbol = $("#index__eye-symbol");