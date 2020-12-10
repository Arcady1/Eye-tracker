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
        resetScrollStates();
});
// The function displays the lock / unlock symbol => changing $lockSymbol css class
function showLockSymbol(toLock = true) {
    let lockSymbolWrapperHiddenTimer = parseFloat($lockSymbolWrapper.css("transition-duration")) * 1000;
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