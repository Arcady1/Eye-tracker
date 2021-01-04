(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let scroll_and_setDist = require('./scroll_and_setDist.js');
let vars = require('./vars.js');

// The function checks if the user blinked
function blinkCheck() {
    // Significant reduction in the distance between the eyelids (%)
    const k_close = 25;
    const k_open = 5;
    // Blink interval
    const resetTimer = 500;
    // The difference between previous and current eyelid distance (%)
    let currentEyeDistValue = {};
    // Indexes: 0 - the first blink, 1 - the second one, 2 - difference (ms)
    let blinkDates = [0, 0, 0];
    let blinkDatesIndex = 0;
    // The index of blinkEyelidDistArr
    let blinkIndex = 0;

    return function (blinkEyelidDistArr, fixedSilhouettePos, currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist) {
        // The function checks if the user blinked
        currentEyeDistValue = {
            "leftEyeVal": (currentLeftEyeDist * 100) / blinkEyelidDistArr[0]["leftEyeDist"],
            "rightEyeVal": (currentRightEyeDist * 100) / blinkEyelidDistArr[0]["rightEyeDist"]
        }

        console.log(100 - currentEyeDistValue.leftEyeVal, 100 - currentEyeDistValue.rightEyeVal);

        // Checking for head displacement
        silhouetteOffsetBoolean(blinkEyelidDistArr, fixedSilhouettePos, currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist);
        // Checking for eyes closing and opening
        if (((100 - currentEyeDistValue.leftEyeVal > k_close) || (100 - currentEyeDistValue.rightEyeVal > k_close)) && (blinkIndex == 0)) {
            console.log("close");
            blinkIndex = 1;
        } else if (((100 - currentEyeDistValue.leftEyeVal < -k_open) || (100 - currentEyeDistValue.rightEyeVal < -k_open)) && (blinkIndex == 1)) {
            console.log("open");
            blinkDates[blinkDatesIndex] = new Date().getTime();
            blinkIndex = 2;

            // Blink interval
            blinkDates[2] = Math.abs(blinkDates[1] - blinkDates[0]);

            // Reset blink timer; this "if" works when the user made double blink
            if (blinkDates[2] <= resetTimer) {
                console.log(blinkDates[2]);
                // If the page is scrolling, the double blink stops it, otherwise it starts scrolling
                if (vars.scrollDirection != 0)
                    vars.scrollDirection = 0;
                else {
                    // Setting the vars.scrollDirection
                    vars.setScrollDirection = true;
                    silhouetteOffsetBoolean(fixedSilhouettePos, currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist);
                    // It shows the unlock sign
                    console.log("showLockSymbol(false)");
                    // ! showLockSymbol(false);
                }
            }

            blinkDatesIndex = changeBlinkIndex(blinkDatesIndex);
            blinkIndex = 0;
        }

        // The function swap blinkDatesIndex
        function changeBlinkIndex(blinkDatesIndex_) {
            return (blinkDatesIndex_ == 0) ? 1 : 0;
        }

        // The function checks if there was a significant displacement of the head
        function silhouetteOffsetBoolean(blinkEyelidDistArr, fixedSilhouettePos, currentLeftEyeDist, currentRightEyeDist, currentSilhouetteDist, fixedSilhouetteDist) {
            // Significant displacement of a person's face (%)
            const k = 2.5;
            let offsetValueTop = (fixedSilhouetteDist.top * 100) / currentSilhouetteDist.top;
            let offsetValueBottom = (fixedSilhouetteDist.bottom * 100) / currentSilhouetteDist.bottom;

            /* If vars.setScrollDirection == true, the function sets vars.scrollDirection by head movement, otherwise checks 
            the face offset to reset blinkIndex and set blinkEyelidDistArr*/
            if (vars.setScrollDirection) {
                // Scroll up
                if ((100 - offsetValueTop < -k) || (100 - offsetValueBottom < -k)) {
                    vars.scrollDirection = 1;
                    // Beginnig of scroll
                    scroll_and_setDist.setScrollDirectionAndMakeScroll();
                    vars.setScrollDirection = false;
                }
                // Scroll down
                else if ((100 - offsetValueBottom > k) || (100 - offsetValueTop > k)) {
                    vars.scrollDirection = -1;
                    // Beginning of scroll
                    scroll_and_setDist.setScrollDirectionAndMakeScroll();
                    vars.setScrollDirection = false;
                }
            } else {
                if ((100 - offsetValueTop < -k) || (100 - offsetValueTop > k) || (100 - offsetValueBottom < -k) || (100 - offsetValueBottom > k)) {
                    console.log("New direction");

                    // Setting a the default silhouette position
                    fixedSilhouettePos.top = currentSilhouetteDist.top;
                    fixedSilhouettePos.bottom = currentSilhouetteDist.bottom;
                    // Setting the blinkIndex
                    blinkIndex = 0;

                    console.log(currentLeftEyeDist, currentRightEyeDist);
                    // Setting a the default eyes distance
                    blinkEyelidDistArr[blinkIndex] = {
                        "leftEyeDist": currentLeftEyeDist,
                        "rightEyeDist": currentRightEyeDist
                    }
                }
            }
        }
    }
}

module.exports = {
    blinkCheck: blinkCheck()
}
},{"./scroll_and_setDist.js":6,"./vars.js":7}],2:[function(require,module,exports){
function min(a, b) {
    return (a <= b) ? a : b;
}

function max(a, b) {
    return (a >= b) ? a : b;
}

function maxInArrayOfArrays(arr, indexInSubArr) {
    let max = -Infinity;

    arr.forEach(element => {
        if (element[indexInSubArr] > max)
            max = element[indexInSubArr];
    });

    return max;
}

function minInArrayOfArrays(arr, indexInSubArr) {
    let min = Infinity;

    arr.forEach(element => {
        if (element[indexInSubArr] < min)
            min = element[indexInSubArr];
    });

    return min;
}

module.exports = {
    min: min,
    max: max,
    maxInArrayOfArrays: maxInArrayOfArrays,
    minInArrayOfArrays: minInArrayOfArrays
}
},{}],3:[function(require,module,exports){
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
},{"./blink_check.js":1,"./extra_func.js":2}],4:[function(require,module,exports){
let model_pred = require('./model_pred.js');

// IIFE
(function () {
    let video = document.getElementById("video");

    // Getting navigator.getUserMedia
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
            return model_pred.modelLoading();
        })
        .then((model) => {
            model_pred.makePredictions(model);
        })
        .catch(() => {
            console.log("ERROR: Model is not loaded");
        });
})();



// TODO Stop scroll while scrolling the mouse wheel
// window.addEventListener("wheel", () => {
//     wheelScrollCounter += 1;
//     // * STATES
//     if (wheelScrollCounter == 1)
//         scrollDirection = 0;
// });

// // The function displays the lock / unlock symbol => changing $lockSymbol css class
// function showLockSymbol(toLock = true) {
//     // Make it visible
//     $lockSymbolWrapper.css({
//         "visibility": "visible",
//         "opacity": 1
//     });
//     // Show the lock / unlock symbol
//     if (toLock == true) {
//         $lockSymbol.removeClass("unlock-active");
//         $lockSymbol.addClass("lock-active");
//     } else {
//         $lockSymbol.removeClass("lock-active");
//         $lockSymbol.addClass("unlock-active");
//     }
//     // Make it hidden
//     setTimeout(() => {
//         $lockSymbolWrapper.css({
//             "visibility": "hidden",
//             "opacity": 0
//         });
//     }, lockSymbolWrapperHiddenTimer);
// }

// function changeEyeWatchSymbol(unwatchSymbol = true) {
//     if (unwatchSymbol == true) {
//         $eyeSymbol.removeClass("eye-symbol-watch");
//         $eyeSymbol.addClass("eye-symbol-unwatch");
//     } else {
//         $eyeSymbol.removeClass("eye-symbol-unwatch");
//         $eyeSymbol.addClass("eye-symbol-watch");
//     }
// }

// TODO face_points_render


// TODO model_pred.js


// TODO blink_check.js


// TODO extra_func.js


// TODO scroll_and_setDist.js

// TODO vars.js
// // jQuery
// let $video__wrapper = $("#video__wrapper");
// // Lock symbol
// let $lockSymbol = $("#lock-symbol");
// let $lockSymbolWrapper = $("#lock-symbol__wrapper");
// let lockSymbolWrapperHiddenTimer = parseFloat($lockSymbolWrapper.css("transition-duration")) * 1000;
// // Eye symbol
// let $eyeSymbol = $("#index__eye-symbol");
// // JS
// ! let video = document.getElementById("video");
// // Scroll direction: 0 - horizon, 1 - up, -1 - down
// ! let scrollDirection = 0;
// // Indexes: 0 - the first blink, 1 - the second one, 2 - difference (ms)
// ! let blinkDates = [0, 0, 0];
// ! let blinkDatesIndex = 0;
// // Array of distances between eyelids { "leftEyeDist", rightEyeDist" }
// ! let blinkEyelidDistArr = [0, 0, 0];
// ! let blinkIndex = 0;
// // Fixed silhouette positions { "top", "botom" }
// ! let fixedSilhouettePos = 0;
// // Wheel scroll
// let wheelScrollCounter = 0;
// // ScrollTimer
// let timerScroll;
// //  It is used for the correct operation of the function silhouetteOffsetBoolean. Allows to set the direction of scrolling by head movement
// ! let setScrollDirection = false;
},{"./model_pred.js":5}],5:[function(require,module,exports){
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
},{"./face_points_render.js":3}],6:[function(require,module,exports){
let vars = require('./vars.js');

// The function checks scroll direction and starts scroll
function setScrollDirectionAndMakeScroll() {
    // Scroll direction: 0 - horizon, 1 - up, -1 - down
    // ! let vars.scrollDirection = 0;
    //  It is used for the correct operation of the function silhouetteOffsetBoolean. Allows to set the direction of scrolling by head movement
    // ! let toSetScrollDirection = false;

    // ! return function (getScrollDirection_ = false, setScrollDirection_ = 5, getToSetScrollDirection_ = false, setToSetScrollDirection_ = 5) {
    return function () {
        // Getting and setting vars.scrollDirection and toSetScrollDirection
        // if (setScrollDirection_ != 5) {
        //     console.log("setScrollDirection_");
        //     vars.scrollDirection = setScrollDirection;
        // }
        // if (getToSetScrollDirection_ == true) {
        //     console.log("getToSetScrollDirection_");
        //     return toSetScrollDirection;
        // }
        // if (setToSetScrollDirection_ != 5) {
        //     console.log("setToSetScrollDirection_");
        //     toSetScrollDirection = setToSetScrollDirection;
        // }

        // The function checks scroll direction and starts scroll
        if (vars.scrollDirection != 0) {
            // "index.js"
            // ! wheelScrollCounter = 0;
            makeScroll();
        } else {
            // !showLockSymbol();
            vars.scrollDirection = 0;
        }

        // The function triggers a scroll
        function makeScroll() {
            let pageScrollOffset = 2;
            let pageScrollSpeed = 10;

            if (vars.scrollDirection == 1)
                smoothScroll(pageScrollSpeed, -pageScrollOffset);
            else if (vars.scrollDirection == -1)
                smoothScroll(pageScrollSpeed, pageScrollOffset);

            function smoothScroll(scrollSpeed, scrollOffset) {
                window.scrollTo(0, window.pageYOffset + scrollOffset);
                // If scroll has reached the beginning or end of the page
                if ((window.pageYOffset == 0) || (window.pageYOffset == document.documentElement.scrollHeight - document.body.clientHeight)) {
                    resetScrollStates();
                    return 0;
                }
                // If double blink
                else if (vars.scrollDirection == 0) {
                    resetScrollStates();
                    return 0;
                }

                vars.timerScroll = setTimeout(smoothScroll, scrollSpeed, scrollSpeed, scrollOffset);
            }
        }

        // Reset scroll states
        function resetScrollStates() {
            vars.scrollDirection = 0;
            clearTimeout(vars.timerScroll);
            // ! showLockSymbol();
        }
    }
}

// The function returns the vars.scrollDirection (-1; 0; 1)
// function getScrollDirection() {
//     // console.log(setScrollDirectionAndMakeScroll(getScrollDirection_ = true));
//     // return setScrollDirectionAndMakeScroll(getScrollDirection_);
    
//     // let x = 10;
//     // return ++x;
// }
// // The function sets the vars.scrollDirection (-1; 0; 1)
// function setScrollDirection() {
//     console.log("here2");
//     // setScrollDirectionAndMakeScroll(setScrollDirection_ = vars.scrollDirection_);
//     return 0;
// }

// // The function returns the status (true / false) of toSetScrollDirection
// function getToSetScrollDirection() {
//     console.log("here3");
//     // return setScrollDirectionAndMakeScroll(getToSetScrollDirection_ = true);
//     return 0;
// }
// // The function sets the status (true / false) of toSetScrollDirection
// function toSetScrollDirectionFunc() {
//     console.log("here4");
//     // setScrollDirectionAndMakeScroll(setToSetScrollDirection_ = toSetScrollDirection_);
//     return 0;
// }

module.exports = {
    setScrollDirectionAndMakeScroll: setScrollDirectionAndMakeScroll(),

    // getScrollDirection: vars.scrollDirection,
    // setScrollDirection: setScrollDirection,

    // getToSetScrollDirection: getToSetScrollDirection,
    // toSetScrollDirectionFunc: toSetScrollDirectionFunc
}
},{"./vars.js":7}],7:[function(require,module,exports){
let scrollDirection = 0;
let setScrollDirection = false;
let timerScroll;

module.exports = {
    scrollDirection: scrollDirection,
    setScrollDirection: setScrollDirection,
    timerScroll: timerScroll
}
},{}]},{},[4,5]);
