let model_pred = require('./model_pred.js');
let vars = require('./vars.js');

// IIFE
(function () {
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
            vars.video.srcObject = stream;
            vars.video.play();
        })
        .then(() => {
            return model_pred.modelLoading();
        })
        .then((model) => {
            model_pred.makePredictions(model);
        })
        .catch((err) => {
            console.log(`ERROR: No camera access OR Model is not loaded\n${err}`);
        });
})();

// Stop scroll while scrolling the mouse wheel
window.addEventListener("wheel", () => {
    vars.wheelScrollCounter += 1;

    if (vars.wheelScrollCounter == 1)
        vars.scrollDirection = 0;
});