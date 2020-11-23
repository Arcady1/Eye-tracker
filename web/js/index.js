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
// Setting a new normal distance between eyes and nose 
$horizont_button.click(() => {
    setNormalDist = true;
    $horizont_point.css("display", "none");
});
// Function checks if its need to scroll
function checkScroll(cur, norm) {
    // console.log(cur, norm);
    // ! 1.7
    if (cur - norm > 1.74)
        console.log("Up", cur, norm, cur - norm);
    // ! -2.5
    else if (cur - norm < (-2.1))
        console.log("Down", cur, norm, cur - norm);
    else
        console.log("Stop", cur - norm);
}