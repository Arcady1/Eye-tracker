// The function circles the face parts; input: array of face position (x, y, z) 
function faceDotGenerator(...args) {
    // ! CSS classes
    // ! let class__ = "iris-pos-dot ";
    // Removing previous points 
    $(".iris-pos-dot").remove();
    // User face parts
    let faceParts = {
        // Irises
        "irisLeft": {
            "x": args[0][0][0],
            "y": args[0][0][1]
        },
        "irisRight": {
            "x": args[3][0][0],
            "y": args[3][0][1]
        },
        // Left eye
        "leftLowerEyePos": {
            "x": args[0][0][0],
            "y": min(args[1][4][1], args[1][3][1])
        },
        "leftUpperEyePos": {
            "x": args[0][0][0],
            "y": max(args[2][3][1], args[2][4][1])
        },
        // Right eye
        "rightLowerEyePos": {
            "x": args[3][0][0],
            "y": min(args[4][3][1], args[4][4][1])
        },
        "rightUpperEyePos": {
            "x": args[3][0][0],
            "y": max(args[5][3][1], args[5][4][1])
        }
    };

    // ! RENDERING
    // Irises
    // facePointsRendering(faceParts.irisLeft.x, faceParts.irisLeft.y, class__);
    // facePointsRendering(faceParts.irisRight.x, faceParts.irisRight.y, class__);
    // Left eye
    // facePointsRendering(faceParts.irisLeft.x, faceParts.leftLowerEyePos.y, class__ + "eyes-red-style");
    // facePointsRendering(faceParts.irisLeft.x, faceParts.leftUpperEyePos.y, class__ + "eyes-blue-style");
    // Right eye
    // facePointsRendering(faceParts.irisRight.x, faceParts.rightLowerEyePos.y, class__ + "eyes-red-style");
    // facePointsRendering(faceParts.irisRight.x, faceParts.rightUpperEyePos.y, class__ + "eyes-blue-style");
    // ! RENDERING

    // Setting the previous Eyelid Distance and current Eyelid Distance
    // Makes for blink test
    if (currEyelidDist != undefined) {
        prevEyelidDist = {
            "leftEyeYDist": currEyelidDist.leftEyeYDist,
            "rightEyeYDist": currEyelidDist.rightEyeYDist
        };
    }
    currEyelidDist = {
        "leftEyeYDist": Math.abs(faceParts.leftUpperEyePos.y - faceParts.leftLowerEyePos.y),
        "rightEyeYDist": Math.abs(faceParts.rightUpperEyePos.y - faceParts.rightLowerEyePos.y)
    };

    if (currEyelidDist != undefined)
        blinkCheck();
}
// Function is rendering points
function facePointsRendering(x, y, cssClass) {
    $video__wrapper.prepend('<div class="' + cssClass + '" style="left: ' + x + 'px; top: ' + y + 'px"> </div>');
}