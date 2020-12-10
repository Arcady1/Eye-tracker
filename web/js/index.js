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
    wheelScrollCounter = 1;
    // * STATES
    if (wheelScrollCounter == 1)
        resetScrollStates();
});
// The function displays the lock / unlock symbol => changing $lockSymbol css class
function showLockSymbol(toLock = true) {
    if (toLock == true)
        $lockSymbol.removeClass("unlock-active");
    else
        $lockSymbol.addClass("unlock-active");
}