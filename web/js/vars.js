module.exports = {
    // Scroll direction: 0 - horizon, 1 - up, -1 - down
    scrollDirection: 0,
    //  It is used for the correct operation of the function silhouetteOffsetBoolean. Allows to set the direction of scrolling by head movement
    setScrollDirection: false,
    wheelScrollCounter: 0,
    // 1 - closing eyes, 2 - opening eyes, 0 - setting the status (1 / 2)
    numOfBlinks: 0,
    chartXlabels: [],
    chartYlabels: [],
    video: document.getElementById("video")
}