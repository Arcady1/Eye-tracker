// The function circles the Iris; input: array of Iris position (x, y, z) 
function faceDotGenerator(leftIris, rightIris, nose) {
    let irisLeftX = leftIris[0][0];
    let irisLeftY = leftIris[0][1];
    let irisRightX = rightIris[0][0];
    let irisRightY = rightIris[0][1];

    let midwayBetweenEyes = {
        "x": min(irisLeftX, irisRightX) + (Math.abs(irisLeftX - irisRightX) / 2),
        "y": min(irisLeftY, irisRightY) + (Math.abs(irisLeftY - irisRightY) / 2)
    }
    // Removing previous points 
    $(".iris-pos-dot").remove();

    for (let i = 0; i < leftIris.length; i++) {
        facePointsRendering(leftIris[i][0], leftIris[i][1], "iris-pos-dot");
        facePointsRendering(rightIris[i][0], rightIris[i][1], "iris-pos-dot");
    }

    facePointsRendering(midwayBetweenEyes.x, midwayBetweenEyes.y, "iris-pos-dot iris-pos-center");
    facePointsRendering(nose[0][0], nose[0][1], "iris-pos-dot nose-pos-center");
}

function facePointsRendering(x, y, cssClass) {
    $video__wrapper.prepend('<div class="' + cssClass + '" style="left: ' + x + 'px; top: ' + y + 'px"> </div>');
}