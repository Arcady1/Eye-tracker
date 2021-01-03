// The function checks scroll direction and starts scroll
function setScrollDirectionAndMakeScroll() {
    if (scrollDirection != 0) {
        // ! showLockSymbol(false);
        // "index.js"
        wheelScrollCounter = 0;
        makeScroll();
    } else {
        showLockSymbol();
        scrollDirection = 0;
    }
}

// The function triggers a scroll
function makeScroll() {
    let pageScrollOffset = 2;
    let pageScrollSpeed = 10;

    if (scrollDirection == 1)
        smoothScroll(pageScrollSpeed, -pageScrollOffset);
    else if (scrollDirection == -1)
        smoothScroll(pageScrollSpeed, pageScrollOffset);

    function smoothScroll(scrollSpeed, scrollOffset) {
        // $('html').animate({
        //     scrollTop: window.pageYOffset + length
        // }, duration, "linear", () => {
        //     // If scroll has reached the beginning or end of the page
        //     if ((window.pageYOffset == 0) || (window.pageYOffset == document.documentElement.scrollHeight - document.body.clientHeight))
        //         resetScrollStates();
        //     // If double blink
        //     else if (scrollDirection == 0)
        //         resetScrollStates();
        //     else
        //         smoothScroll(duration, length);
        // });

        window.scrollTo(0, window.pageYOffset + scrollOffset);
        // If scroll has reached the beginning or end of the page
        if ((window.pageYOffset == 0) || (window.pageYOffset == document.documentElement.scrollHeight - document.body.clientHeight)) {
            resetScrollStates();
            return 0;
        }
        // If double blink
        else if (scrollDirection == 0) {
            resetScrollStates();
            return 0;
        }

        timerScroll = setTimeout(smoothScroll, scrollSpeed, scrollSpeed, scrollOffset);
    }
}

// Reset scroll states
function resetScrollStates() {
    scrollDirection = 0;
    clearTimeout(timerScroll);
    showLockSymbol();
}