let vars = require('./vars.js');

// The function checks scroll direction and starts scroll
function setScrollDirectionAndMakeScroll() {
    let pageScrollOffset = 2;
    let pageScrollSpeed = 10;
    let timerScroll;

    return function () {
        // The function checks scroll direction and starts scroll
        if (vars.scrollDirection != 0) {
            // "index.js"
            console.log("wheelScrollCounter = 0;");
            // ! wheelScrollCounter = 0;
            makeScroll();
        } else {
            console.log("showLockSymbol();");
            // !showLockSymbol();
            vars.scrollDirection = 0;
        }

        // The function triggers a scroll
        function makeScroll() {
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

                timerScroll = setTimeout(smoothScroll, scrollSpeed, scrollSpeed, scrollOffset);
            }
        }

        // Reset scroll states
        function resetScrollStates() {
            vars.scrollDirection = 0;
            clearTimeout(timerScroll);
            console.log("showLockSymbol();");
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