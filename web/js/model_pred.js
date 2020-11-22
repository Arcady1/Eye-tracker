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
        modelPrediction(model_).then((predictions) => {
            if (normalDistBetweenNoseAndEyes == null) {
                console.log(`Press "IT'S OK"`);
            }
            else {
                let path = predictions["0"]["annotations"];
                faceFixTimeout = 6;
                faceDotGenerator(path["leftEyeIris"], path["rightEyeIris"], path["noseTip"]);
            }
        });
        makePredictions(model_);
    }, faceFixTimeout);
}
// Getting predictions; input: model 
async function modelPrediction(model) {
    // An array of prediction objects for the faces in the input, which include information about each face
    const faces = await model.estimateFaces({
        input: video
    });
    return faces;
}