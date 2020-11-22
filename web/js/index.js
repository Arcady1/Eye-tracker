let video = document.getElementById("video");
let $video__wrapper = $("#video__wrapper");

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

// The function circles the Iris; input: array of Iris position (x, y, z) 
function irisDotGenerator(leftIrisPos, rightIrisPos, midwayBetweenEyesPos) {
    // Removing previous points 
    $(".iris-position-dot").remove();

    for (let i = 0; i < leftIrisPos.length; i++) {
        pointsAroundTheIrises(leftIrisPos[i][0], leftIrisPos[i][1]);
        pointsAroundTheIrises(rightIrisPos[i][0], rightIrisPos[i][1]);
    }

    midwayBetweenEyes(midwayBetweenEyesPos);

    function pointsAroundTheIrises(x, y) {
        $video__wrapper.prepend('<div class="iris-position-dot" style="left: ' + x + 'px; top: ' + y + 'px"> </div>');
    }

    function midwayBetweenEyes(midwayBetweenEyesPos) {
        $video__wrapper.prepend('<div class="iris-position-dot iris-position-center" style="left: ' + midwayBetweenEyesPos[0][0] + 'px; top: ' + midwayBetweenEyesPos[0][1] + 'px"> </div>');
    }
}