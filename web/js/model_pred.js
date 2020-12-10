// Model loading
async function modelLoading() {
    const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipe);
    console.log("The model is loaded!");
    return model;
}
// The function makes predictions  
function makePredictions(model_) {
    setTimeout(() => {
        modelPrediction(model_)
            .then((predictions) => {
                let path = predictions["0"]["annotations"];
                faceDotGenerator(path["leftEyeIris"], path["leftEyeLower0"], path["leftEyeUpper0"], path["rightEyeIris"], path["rightEyeLower0"], path["rightEyeUpper0"]);
            })
            .catch((err) => {
                console.log(`NO FACE\n${err}`);
                // Stop scroll if the face is't in the frame
                letsScroll = false;
                scrollDirection = 0;
            });
        makePredictions(model_);
    }, 12);
}
// Getting predictions; input: model 
async function modelPrediction(model) {
    // An array of prediction objects for the faces in the input, which include information about each face
    const faces = await model.estimateFaces({
        input: video
    });
    return faces;
}