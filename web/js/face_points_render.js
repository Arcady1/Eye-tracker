let extra_func = require('./extra_func.js');
let blink_check = require('./blink_check.js');
let chart = require('./chart.js');
let $ = require('jquery');

// The function circles the face parts; input: array of face position (x, y, z) 
function faceDotGenerator() {
    // Fixed distances between eyelids { "leftEyeDist", rightEyeDist" }
    let fixedEyelidDist = 0;
    // Fixed silhouette positions { "top", "botom" }
    let fixedSilhouettePos = 0;
    // User face parts
    let faceParts = {};
    // Video wrapper to remove dots in it 
    let $videoWrapper = $("#video__wrapper");

    return function (...args) {
        // Removing all silhouette dots
        $("dot").remove();

        // User face parts
        faceParts = {
            // Left eye
            "leftLowerEyePos": {
                "y": extra_func.min(args[0][4][1], args[0][3][1])
            },
            "leftUpperEyePos": {
                "y": extra_func.max(args[1][3][1], args[1][4][1])
            },
            // Right eye
            "rightLowerEyePos": {
                "y": extra_func.min(args[2][3][1], args[2][4][1])
            },
            "rightUpperEyePos": {
                "y": extra_func.max(args[3][3][1], args[3][4][1])
            }
        };

        // Rendering silhouette dots
        faceDotRender($videoWrapper, args);

        // Current distance between eyelids
        faceParts.currentEyelidDist = {
            "leftEyelidDist": Math.abs(faceParts.rightUpperEyePos.y - faceParts.rightLowerEyePos.y),
            "rightEyelidDist": Math.abs(faceParts.leftUpperEyePos.y - faceParts.leftLowerEyePos.y)
        };

        // Top and bottom of the face
        faceParts.silhouette = {
            "top": extra_func.maxInArrayOfArrays(args[4], 1),
            "bottom": extra_func.minInArrayOfArrays(args[4], 1)
        }

        // Default distance between eyelids
        if (fixedEyelidDist == 0) {
            fixedEyelidDist = {
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

        // Chart rendering
        chart.chartInfoRendering(((new Date).getMilliseconds()), faceParts.leftUpperEyePos.y);

        // Blink check
        blink_check.blinkCheck(fixedEyelidDist, fixedSilhouettePos, faceParts.currentEyelidDist.leftEyelidDist, faceParts.currentEyelidDist.rightEyelidDist, faceParts.silhouette);
    }
}

// The function renders face silhouette
function faceDotRender($videoWrapper, args) {
    args.forEach(facePart => {
        facePart.forEach(pairOfCoords => {
            $videoWrapper.append('<dot class="face-pos-dot face-red-style" id="face_dot" style="top: ' + pairOfCoords[1] + 'px; left: ' + pairOfCoords[0] + 'px"></dot>');
        });
    });
}

module.exports = {
    faceDotGenerator: faceDotGenerator()
}