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