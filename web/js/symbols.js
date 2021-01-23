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

module.exports = {
    showLockSymbol: showLockSymbol()
}