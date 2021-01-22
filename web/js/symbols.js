let $ = require('jquery');

// The function displays the lock / unlock symbol => changing $lockSymbol css class
function showLockSymbol() {
    // Lock symbol
    let $lockSymbol = $("#lock-symbol");

    return function (toLock = true) {
        // Show the lock / unlock symbol
        if (toLock == true) {
            $lockSymbol.removeClass("unlock-active");
            $lockSymbol.addClass("lock-active");
        } else {
            $lockSymbol.removeClass("lock-active");
            $lockSymbol.addClass("unlock-active");
        }
    }
}

function changeEyeWatchSymbol() {
    // Eye symbol
    let $eyeSymbol = $("#index__eye-symbol");

    return function (unwatchSymbol = true) {
        if (unwatchSymbol == true) {
            $eyeSymbol.removeClass("eye-symbol-watch");
            $eyeSymbol.addClass("eye-symbol-unwatch");
        } else {
            $eyeSymbol.removeClass("eye-symbol-unwatch");
            $eyeSymbol.addClass("eye-symbol-watch");
        }
    }
}

module.exports = {
    showLockSymbol: showLockSymbol(),
    changeEyeWatchSymbol: changeEyeWatchSymbol()
}