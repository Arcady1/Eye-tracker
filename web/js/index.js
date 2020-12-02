navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

// Request user camera access
navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(stream => {
        video.srcObject = stream;
        video.play();
    }).catch(() => {
        console.log("ERROR: No camera access");
    })
    .then(() => {
        return modelLoading();
    })
    .then((model) => {
        makePredictions(model);
    })
    .catch(() => {
        console.log("ERROR: Model is not loaded");
    });

// ?  Function checks if its need to scroll
// ?  function checkScroll(cur, norm) {
// ?      console.log(norm, cur, cur - norm);
// ?      if (cur - norm > 0.29)
// ?          ++up_;
// ?      else if (cur - norm < (-0.4))
// ?          ++down_;
// ?      else
// ?          ++stop_;
// ?  }
// ?  View direction timer 
// ?  function frequency() {
// ?      timerID = setInterval(() => {
// ?          let res = Math.max(up_, down_, stop_);
// ?          let sum = up_ + down_ + stop_;
// ?          if (res == up_) {
// ?              pastDirecion = 1;
// ?              currentDirection = 1;
// ?              console.log("UP:", res + "/" + sum + " ~ " + res / sum * 100 + "%");
// ?          } else if (res == down_) {
// ?              pastDirecion = -1;
// ?              currentDirection = -1;
// ?              console.log("DOWN:", res + "/" + sum + " ~ " + res / sum * 100 + "%");
// ?          } else if (res == stop_) {
// ?              pastDirecion = 0;
// ?              currentDirection = 0;
// ?              console.log("STOP:", res + "/" + sum + " ~ " + res / sum * 100 + "%");
// ?          }
// ?          up_ = 0;
// ?          down_ = 0;
// ?          stop_ = 0;
// ?      }, 2500);


// ?  }
// ?  Functions scrolls the wab-page
// ?  function scrolling() {
// ?      $('html').animate({

// ?      })
// ?  }