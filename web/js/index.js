<<<<<<< HEAD
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
        return modelLoading();
    })
    .then((model) => {
        makePredictions(model);
    })
    .catch(() => {
        console.log("ERROR: Model is not loaded");
    });

// Stop scroll while scrolling the mouse wheel
window.addEventListener("wheel", () => {
    wheelScrollCounter += 1;
    // * STATES
    if (wheelScrollCounter == 1)
        scrollDirection = 0;
});

// The function displays the lock / unlock symbol => changing $lockSymbol css class
function showLockSymbol(toLock = true) {
    // Make it visible
    $lockSymbolWrapper.css({
        "visibility": "visible",
        "opacity": 1
    });
    // Show the lock / unlock symbol
    if (toLock == true) {
        $lockSymbol.removeClass("unlock-active");
        $lockSymbol.addClass("lock-active");
    } else {
        $lockSymbol.removeClass("lock-active");
        $lockSymbol.addClass("unlock-active");
    }
    // Make it hidden
    setTimeout(() => {
        $lockSymbolWrapper.css({
            "visibility": "hidden",
            "opacity": 0
        });
    }, lockSymbolWrapperHiddenTimer);
}

function changeEyeWatchSymbol(unwatchSymbol = true) {
    if (unwatchSymbol == true) {
        $eyeSymbol.removeClass("eye-symbol-watch");
        $eyeSymbol.addClass("eye-symbol-unwatch");
    } else {
        $eyeSymbol.removeClass("eye-symbol-unwatch");
        $eyeSymbol.addClass("eye-symbol-watch");
    }
}
=======
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

    if (vars.wheelScrollCounter == 1)
        vars.scrollDirection = 0;
});
>>>>>>> develop-head-movement-to-scroll-modules
