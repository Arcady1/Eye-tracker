let face_points_render = require('./face_points_render.js');
let vars = require('./vars.js');
let $ = require('jquery');

// Model loading
async function modelLoading() {
    const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipe);
    console.log("The model is loaded!");
    return model;
}
// The function makes predictions  
function makePredictions(model_) {
    let path;
    predictionsTimer(model_);

    function predictionsTimer(model_) {
        setTimeout(() => {
            modelPrediction(model_)
                .then((predictions) => {
                    path = predictions["0"]["annotations"];
                    face_points_render.faceDotGenerator(path["leftEyeLower0"], path["leftEyeUpper0"], path["rightEyeLower0"], path["rightEyeUpper0"], path["silhouette"]);
                })
                .catch((err) => {
                    console.log(`NO FACE\n${err}`);
                    // Removing all silhouette dots
                    $("dot").remove();
                    // Stop scroll if the face isn't in the cam
                    vars.scrollDirection = 0;
                    // Stop blinks if the face isn't in the cam
                    vars.numOfBlinks = 0;
                });
            predictionsTimer(model_);
        }, 12);
    }
}
// Getting predictions; input: model 
async function modelPrediction(model) {
    // An array of prediction objects for the faces in the input, which include information about each face
    const faces = await model.estimateFaces({
        input: vars.video
    });
    return faces;
}

module.exports = {
    modelLoading: modelLoading,
    makePredictions: makePredictions
}