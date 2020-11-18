let canvas = document.getElementById("canvas");
let video = document.getElementById("video");
let ctx = canvas.getContext("2d");

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
            modelPrediction(model_);
        }, 1000);
    })
    .catch(() => {
        console.log("ERROR: Sth wrong with modelPrediction()");
    });

// Model loading
async function modelLoading() {
    const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
    return model;
}
// Getting predictions; input: model 
async function modelPrediction(model) {
    // an array of prediction objects for the faces in the input, which include information about each face
    const faces = await model.estimateFaces({
        input: video
    });
    console.log(faces);
}