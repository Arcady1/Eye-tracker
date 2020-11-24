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
    clearInterval(timerID);
    frequency();
});
$click_pos.click(() => {
    console.log("currentDist", currentDist, "normalDist", normalDist, "dif", currentDist - normalDist);
});
// Function checks if its need to scroll
function checkScroll(cur, norm) {
    if (cur - norm > 0.35)
        ++up_;
    else if (cur - norm < (-0.4))
        ++down_;
    else
        ++stop_;
}
// View direction timer 
function frequency() {
    timerID = setInterval(() => {
        let res = Math.max(up_, down_, stop_);
        let sum = up_ + down_ + stop_;
        if (res == up_)
            console.log("UP:", res + "/" + sum + " ~ " + res / sum * 100 + "%");
        else if (res == down_)
            console.log("DOWN:", res + "/" + sum + " ~ " + res / sum * 100 + "%");
        else if (res == stop_)
            console.log("STOP:", res + "/" + sum + " ~ " + res / sum * 100 + "%");
        up_ = 0;
        down_ = 0;
        stop_ = 0;
    }, 2500);
}