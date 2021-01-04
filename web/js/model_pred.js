let face_points_render = require('./face_points_render.js');

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
                    face_points_render.faceDotGenerator(path["leftEyeIris"], path["leftEyeLower0"], path["leftEyeUpper0"], path["rightEyeIris"], path["rightEyeLower0"], path["rightEyeUpper0"], path["silhouette"]);
                })
                // .then(() => {
                //     changeEyeWatchSymbol.status = 0;
                //     // changeEyeWatchSymbol.status == the number of function calls
                //     if (changeEyeWatchSymbol.status == 0) {
                //         changeEyeWatchSymbol.status = 1;
                //         changeEyeWatchSymbol(false);
                //     }
                // })
                // .catch((err) => {
                //     if (changeEyeWatchSymbol.status == 1) {
                //         changeEyeWatchSymbol.status = 2
                //         changeEyeWatchSymbol(true);
                //     }
                //     console.log(`NO FACE\n${err}`);
                //     // Stop scroll if the face isn't in the cam
                //     scrollDirection = 0;
                //     // Stop blinks if the face isn't in the cam
                //     blinkIndex = 0;
                // });
            predictionsTimer(model_);
        }, 12);
    }
}
// Getting predictions; input: model 
async function modelPrediction(model) {
    // An array of prediction objects for the faces in the input, which include information about each face
    const faces = await model.estimateFaces({
        input: video
    });
    return faces;
}

module.exports = {
    modelLoading: modelLoading,
    makePredictions: makePredictions
}