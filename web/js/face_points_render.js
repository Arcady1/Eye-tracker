let extra_func = require('./extra_func.js');
let blink_check = require('./blink_check.js');

// The function circles the face parts; input: array of face position (x, y, z) 
function faceDotGenerator() {
    // Array of distances between eyelids { "leftEyeDist", rightEyeDist" }
    let blinkEyelidDistArr = [0, 0, 0];
    // Fixed silhouette positions { "top", "botom" }
    let fixedSilhouettePos = 0;
    // User face parts
    let faceParts = {};

    return function (...args) {
        // User face parts
        faceParts = {
            // Left eye
            "leftLowerEyePos": {
                "x": args[0][0][0],
                "y": extra_func.min(args[1][4][1], args[1][3][1])
            },
            "leftUpperEyePos": {
                "x": args[0][0][0],
                "y": extra_func.max(args[2][3][1], args[2][4][1])
            },
            // Right eye
            "rightLowerEyePos": {
                "x": args[3][0][0],
                "y": extra_func.min(args[4][3][1], args[4][4][1])
            },
            "rightUpperEyePos": {
                "x": args[3][0][0],
                "y": extra_func.max(args[5][3][1], args[5][4][1])
            }
        };

        // Current distance between eyelids
        faceParts.currentEyelidDist = {
            "leftEyelidDist": Math.abs(faceParts.rightUpperEyePos.y - faceParts.rightLowerEyePos.y),
            "rightEyelidDist": Math.abs(faceParts.leftUpperEyePos.y - faceParts.leftLowerEyePos.y)
        };

        // Top and bottom of the face
        faceParts.silhouette = {
            "top": extra_func.maxInArrayOfArrays(args[6], 1),
            "bottom": extra_func.minInArrayOfArrays(args[6], 1)
        }

        // Default distance between eyelids
        if (blinkEyelidDistArr[0] == 0) {
            blinkEyelidDistArr[0] = {
                "leftEyeDist": faceParts.currentEyelidDist.leftEyelidDist,
                "rightEyeDist": faceParts.currentEyelidDist.rightEyelidDist
            }
        }

        // Fixed silhouette top and bottom positions
        if (fixedSilhouettePos == 0) {
            fixedSilhouettePos = {
                "top": faceParts.silhouette.top,
                "bottom": faceParts.silhouette.bottom
            }
        }

        blink_check.blinkCheck(blinkEyelidDistArr, fixedSilhouettePos, faceParts.currentEyelidDist.leftEyelidDist, faceParts.currentEyelidDist.rightEyelidDist, faceParts.silhouette, fixedSilhouettePos);
    }
}

module.exports = {
    faceDotGenerator: faceDotGenerator()
}