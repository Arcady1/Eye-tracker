// ! let canvas = document.getElementById("canvas");
let video = document.getElementById("video");
let $irisDot = $("#iris-position-dot");
let $video__wrapper = $("#video__wrapper");
// ! let ctx = canvas.getContext("2d");

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
    .catch(() => {
        console.log("ERROR: Model is not loaded");
    })
    .then((model_) => {
        setInterval(() => {
            modelPrediction(model_).then((predictions) => {
                // ! console.log(predictions);
                irisDotGenerator(predictions[0].annotations.leftEyeIris, predictions[0].annotations.rightEyeIris);
                // ! irisDotPosition(predictions[0].annotations.leftEyeIris, predictions[0].annotations.rightEyeIris);
            });
        }, 13);
    })
    .catch(() => {
        console.log("ERROR: Sth wrong with modelPrediction()");
    });

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
        input: video,
        // ! flipHorizontal: true
    });
    return faces;
    // console.log(faces);
}
// Iris dot changing position
function irisDotPosition(leftIrisPos, rightIrisPos) {
    console.log("left: ", leftIrisPos);
    console.log("right: ", rightIrisPos);
    console.log("==============");
    $irisDot.css({
        left: leftIrisPos[0][0] + "px",
        top: leftIrisPos[0][1] + "px"
    })
}
// Function circles the Iris; input: array of Iris position (x, y, z) 
function irisDotGenerator(leftIrisPos, rightIrisPos) {
    let xL, yL, xR, yR;

    $(".iris-position-dot").remove();

    for (let i = 0; i < leftIrisPos.length; i++) {
        xL = leftIrisPos[i][0];
        yL = leftIrisPos[i][1];
        
        xR = rightIrisPos[i][0];
        yR = rightIrisPos[i][1];
        
        $video__wrapper.prepend('<div class="iris-position-dot" id="iris-position-dot" style="left: ' + xL + 'px; top: ' + yL + 'px"> </div>');
        $video__wrapper.prepend('<div class="iris-position-dot" id="iris-position-dot" style="left: ' + xR + 'px; top: ' + yR + 'px"> </div>');
    }
}