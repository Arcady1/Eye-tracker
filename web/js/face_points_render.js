// The function circles the face parts; input: array of face position (x, y, z) 
function faceDotGenerator(...args) {
    // !!! let currentDist;
    // Removing previous points 
    $(".iris-pos-dot").remove();
    // Face rendering
    // ? args.forEach(facePart => {
    // ?     facePart.forEach(coords => {
    // ?         facePointsRendering(coords[0], coords[1], "iris-pos-dot");
    // ?     });
    // ? });
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
            "x": min(args[1][4][0], args[1][3][0]) + (Math.abs(args[1][4][0] - args[1][3][0]) / 2),
            "y": min(args[1][4][1], args[1][3][1]) + (Math.abs(args[1][4][1] - args[1][3][1]) / 2)
        },
        "leftUpperEyePos": {
            "x": args[2][3][0],
            "y": args[2][3][1]
        },
        // Right eye
        "rightLowerEyePos": {
            "x": min(args[4][4][0], args[4][3][0]) + (Math.abs(args[4][4][0] - args[4][3][0]) / 2),
            "y": min(args[4][4][1], args[4][3][1]) + (Math.abs(args[4][4][1] - args[4][3][1]) / 2)
        },
        "rightUpperEyePos": {
            "x": args[5][3][0],
            "y": args[5][3][1]
        }
    }
    // * Midway Irises
    faceParts.midwayBetweenIrises = {
        "x": min(faceParts.irisLeft.x, faceParts.irisRight.x) + (Math.abs(faceParts.irisLeft.x - faceParts.irisRight.x) / 2),
        "y": min(faceParts.irisLeft.y, faceParts.irisRight.y) + (Math.abs(faceParts.irisLeft.y - faceParts.irisRight.y) / 2)
    };
    // Left eye
    faceParts.leftNormalIrisPos = {
        "x": min(faceParts.leftUpperEyePos.x, faceParts.leftLowerEyePos.x) + (Math.abs(faceParts.leftUpperEyePos.x - faceParts.leftLowerEyePos.x) / 2),
        "y": min(faceParts.leftUpperEyePos.y, faceParts.leftLowerEyePos.y) + (Math.abs(faceParts.leftUpperEyePos.y - faceParts.leftLowerEyePos.y) / 2)
    }
    // Right eye
    faceParts.rightNormalIrisPos = {
        "x": min(faceParts.rightUpperEyePos.x, faceParts.rightLowerEyePos.x) + (Math.abs(faceParts.rightUpperEyePos.x - faceParts.rightLowerEyePos.x) / 2),
        "y": min(faceParts.rightUpperEyePos.y, faceParts.rightLowerEyePos.y) + (Math.abs(faceParts.rightUpperEyePos.y - faceParts.rightLowerEyePos.y) / 2)
    };
    // * Midway Normal Irises
    faceParts.midwayNormalIrisPos = {
        // You can use this "x": 
        // "x": min(faceParts.leftNormalIrisPos.x, faceParts.rightNormalIrisPos.x) + (Math.abs(faceParts.leftNormalIrisPos.x - faceParts.rightNormalIrisPos.x) / 2),
        // Or this one:
        "x": faceParts.midwayBetweenIrises.x,
        "y": min(faceParts.leftNormalIrisPos.y, faceParts.rightNormalIrisPos.y) + (Math.abs(faceParts.leftNormalIrisPos.y - faceParts.rightNormalIrisPos.y) / 2)
    };

    // ?  for (const key in faceParts) {
    // ?      let CSSclass = "";
    // ?      if (key == "midwayBetweenIrises")
    // ?          CSSclass += "iris-pos-center";
    // ?      else
    // ?          CSSclass += "eyes-pos-center";
    // ?      facePointsRendering(faceParts[key].x, faceParts[key].y, CSSclass);
    // ?  }

    facePointsRendering(faceParts["midwayBetweenIrises"].x, faceParts["midwayBetweenIrises"].y, "iris-pos-dot iris-pos-center");
    facePointsRendering(faceParts["midwayNormalIrisPos"].x, faceParts["midwayNormalIrisPos"].y, "iris-pos-dot eyes-pos-center");

    // Setting currentDist
    currentDist = faceParts.midwayNormalIrisPos.y - faceParts.midwayBetweenIrises.y;
    // Setting normalDist
    if (setNormalDist == true) {
        normalDist = currentDist;
        setNormalDist = false;
    }
    checkScroll(currentDist, normalDist);
}
// Function is rendering points
function facePointsRendering(x, y, cssClass) {
    $video__wrapper.prepend('<div class="' + cssClass + '" style="left: ' + x + 'px; top: ' + y + 'px"> </div>');
}