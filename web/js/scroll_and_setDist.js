// function makeScroll_(scrollDirection) {
function makeScroll() {
    if (scrollDirection == 1)
        scrollPreset(200, -15);
    else if (scrollDirection == -1)
        scrollPreset(200, 15);

    function scrollPreset(duration, length) {
        $('html').animate({
            scrollTop: window.pageYOffset + length
        }, duration, "linear", () => {
            // If scroll has reached the beginning or end of the page
            if ((window.pageYOffset == 0) || (window.pageYOffset == document.documentElement.scrollHeight - document.body.clientHeight))
                resetScrollStates();
            // If double blink
            else if (scrollDirection == 0)
                resetScrollStates();
            else
                scrollPreset(duration, length);
        });
    }
}

// Reset scroll states
function resetScrollStates() {
    scrollDirection = 0;
    showLockSymbol();
}