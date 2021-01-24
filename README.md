<h1 align="center">
  <a href="https://scrolling-web-page-with-your-eyes.glitch.me/">
    <img src="###" alt="" width="350"></img>
  </a>
  <br>
  <a href="https://scrolling-web-page-with-your-eyes.glitch.me/">Scrolling web page with your eyes</a>
  <br>
</h1>

This application allows you to scroll a web page with your head movements.
The following features are implemented in the current version:
1) Determining the current head position
2) Blink detection
3) Page scrolling on double blinks

### Important
1) This website uses your webcam
2) Face and blink detection is performed online

![GIF][0]

### How it works
* Open this [DEMO][1]
* Allow access to the camera
* Wait for the algorithm to recognize your face 
* Make a double blink to start scroll (the "unlock" icon will appear in the upper right corner)
* Nod up or down
* Make a double blink to stop scroll (the "lock" icon will appear in the upper right corner)

### How to use

To clone and run this application, you'll need Git. From your command line:

```
# Clone this repository
$ git clone https://github.com/Arcady1/Scrolling-web-page-with-your-eyes.git

# Go into the repository
$ cd Scrolling-web-page-with-your-eyes

# Install dependencies
$ npm install

# Open the index.html file
```

### Credits
This software uses the following open source packages:

* [jQuery][2] "^3.5.1"
* [Browserify][3] "latest"
* [TensorFlow][4] "2.6.0"
* [Face landmarks detection model][4.2] "0.0.1"
* [Chart.js][4.3] "^2.9.4"

### Acknowledgments
* [TensorFlow Blog][5]
* [MediaPipe][4.1]
* [MediaPipe Iris][5.2]
* [MediaPipe Iris MODEL CARD][5.3]

### You may also like...
* [Don't touch your face][6] - Face touch detection with BodyPix segmentation
* [Doodle Recognition][7] - Web app classsificator based on the Quick, Draw! Dataset.
* [Pomodoro Bot][8] - Telegram bot with the pomodoro timer

### License
MIT

[0]: ./web/github/eye-control-gif.gif

[1]: https://scrolling-web-page-with-your-eyes.glitch.me/
[2]: https://github.com/jquery/jquery
[3]: https://github.com/browserify/browserify
[4]: https://github.com/tensorflow/tfjs
[4.1]: https://github.com/google/mediapipe
[4.2]: https://blog.tensorflow.org/2020/11/iris-landmark-tracking-in-browser-with-MediaPipe-and-TensorFlowJS.html
[4.3]: https://github.com/chartjs/Chart.js

[5]: https://blog.tensorflow.org/search?label=TensorFlow.js&max-results=20
[5.2]: https://google.github.io/mediapipe/solutions/iris
[5.3]: https://drive.google.com/file/d/1bsWbokp9AklH2ANjCfmjqEzzxO1CNbMu/view

[6]: https://github.com/Arcady1/Do-not-touch-your-face
[7]: https://github.com/Arcady1/Doodle-Recognition-Web
[8]: https://github.com/Arcady1/Telegram-Pomodoro-Bot