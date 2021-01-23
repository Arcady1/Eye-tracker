let vars = require('./vars.js');
let symbols = require('./symbols.js');
let $ = require('jquery');

// The function checks scroll direction and starts scroll
function setScrollDirectionAndMakeScroll() {
    const kScroll = 1.828571429;
    const pageScrollSpeedUp = 8400;
    const pageScrollSpeedDown = pageScrollSpeedUp * kScroll;

    return function () {
        // The function checks scroll direction and starts scroll
        if (vars.scrollDirection != 0) {
            // "index.js"
            vars.wheelScrollCounter = 0;
            makeScroll();
        } else
            resetScrollStates();

        // The function triggers a scroll
        function makeScroll() {
            if (vars.scrollDirection == 1)
                smoothScroll(pageScrollSpeedUp, 0);
            else if (vars.scrollDirection == -1)
                smoothScroll(pageScrollSpeedDown, $(document).height() - $(window).height());

            function smoothScroll(scrollSpeed, scrollTarget) {
                $("html").animate({
                    scrollTop: scrollTarget
                }, {
                    duration: scrollSpeed,
                    easing: "linear",
                    progress: () => {
                        if (vars.scrollDirection == 0) {
                            $("html").stop();
                            resetScrollStates();
                        }
                    },
                    complete: () => {
                        resetScrollStates();
                    }
                });
            }
        }

        // Reset scroll states
        function resetScrollStates() {
            vars.scrollDirection = 0;
            symbols.showLockSymbol();
        }
    }
}

module.exports = {
    setScrollDirectionAndMakeScroll: setScrollDirectionAndMakeScroll()
}