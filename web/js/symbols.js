let $ = require('jquery');

// The function displays the lock / unlock symbol => changing $lockSymbol css class
function showLockSymbol() {
    // Lock symbol
    let $lockSymbol = $("#lock-symbol");
    let $lockSymbolWrapper = $("#lock-symbol__wrapper");
    let lockSymbolWrapperHiddenTimer = parseFloat($lockSymbolWrapper.css("transition-duration")) * 1000;

    return function (toLock = true) {
        console.log("IN showLockSymbol()");
        // Make it visible
        $lockSymbolWrapper.css({
            "visibility": "visible",
            "opacity": 1
        });
        // Show the lock / unlock symbol
        if (toLock == true) {
            $lockSymbol.removeClass("unlock-active");
            $lockSymbol.addClass("lock-active");
        } else {
            $lockSymbol.removeClass("lock-active");
            $lockSymbol.addClass("unlock-active");
        }
        // Make it hidden
        setTimeout(() => {
            $lockSymbolWrapper.css({
                "visibility": "hidden",
                "opacity": 0
            });
        }, lockSymbolWrapperHiddenTimer);
    }
}

// function changeEyeWatchSymbol(unwatchSymbol = true) {
//     if (unwatchSymbol == true) {
//         $eyeSymbol.removeClass("eye-symbol-watch");
//         $eyeSymbol.addClass("eye-symbol-unwatch");
//     } else {
//         $eyeSymbol.removeClass("eye-symbol-unwatch");
//         $eyeSymbol.addClass("eye-symbol-watch");
//     }
// }

module.exports = {
    showLockSymbol: showLockSymbol()
}