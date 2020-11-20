let video = document.getElementById("video");
let $irisDot = $("#iris-position-dot");
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
    .then((model_) => {
        setInterval(() => {
            modelPrediction(model_).then((predictions) => {
                irisDotGenerator(predictions[0].annotations.leftEyeIris, predictions[0].annotations.rightEyeIris);
            });
        }, 1000);
    })
    .catch(() => {
        console.log("ERROR: Model is not loaded");
    })

// Model loading
async function modelLoading() {
    const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipe);
    console.log("The model is loaded!");
    return model;
}
// Getting predictions; input: model 
async function modelPrediction(model) {
    // an array of prediction objects for the faces in the input, which include information about each face
    const faces = await model.estimateFaces({
        input: video
    });
    return faces;
}
// Function circles the Iris; input: array of Iris position (x, y, z) 
function irisDotGenerator(leftIrisPos, rightIrisPos) {
    let xL, yL, xR, yR;
    let irisLeftX = leftIrisPos[0][0];
    let irisRightX = rightIrisPos[0][0];
    let irisY = leftIrisPos[0][1];

    $(".iris-position-dot").remove();

    for (let i = 0; i < leftIrisPos.length; i++) {
        xL = leftIrisPos[i][0];
        yL = leftIrisPos[i][1];

        xR = rightIrisPos[i][0];
        yR = rightIrisPos[i][1];

        video__wrapperPrepend(xL, yL);
        video__wrapperPrepend(xR, yR);
    }
    video__centerPosition(irisLeftX, irisRightX, irisY);


    function video__wrapperPrepend(x, y) {
        $video__wrapper.prepend('<div class="iris-position-dot" style="left: ' + x + 'px; top: ' + y + 'px"> </div>');
    }

    function video__centerPosition(xl, xr, y) {
        $video__wrapper.prepend('<div class="iris-position-dot iris-position-center" style="left: ' + (xr + (Math.abs(xl - xr) / 2)) + 'px; top: ' + y + 'px"> </div>');
    }
}