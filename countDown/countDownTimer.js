/*! countDown Timer
 *
 * @version 2
 * @author Livingston Samuel
 * @license MIT License
 *
 */

(function (win, doc, Date) {
  var countDownTimer = function () {
    var displayElem = doc.createElement('div'),
        pad = function (n, l) {
          return (n = '0' + n, l = n.length, n.substr(l-2, l));
        },
        formatTime = function (rawTime) {
          if (rawTime < 1000) { return '00 : 00 : 00'; }
          var inSecs = rawTime / 1000,
              inMins = 0|(inSecs / 60),
              inHrs = 0|(inMins / 60);

          inSecs = inSecs % 60;
          inMins = inMins % 60;

          return pad(inHrs) + " : " + pad(0|(inMins)) + " : " + pad(0|(inSecs));
        }, timer, isPaused = 0, isActive = 0,
        time = { paused: 0, pause: 0 },
        processTime = function () {
          if (!isActive) { return }

          time.elasped = (+new Date()) - time.start - time.paused;
          if (time.elasped < time.limit && !isPaused) {
            timer = setTimeout(processTime, 250)
          }
          update(formatTime(time.limit - time.elasped));
        }, update = function (time) {
          displayElem.innerHTML = time;
        };

    doc.getElementsByTagName('body')[0].appendChild(displayElem);
    
    return {
      time: time,
      start: function (limit) {
        if (isActive) { return; }

        this.reset();

        time.start = +new Date();
        time.limit = limit;

        isActive = 1;
        processTime();
      },
      pause: function () {
        isPaused = !isPaused;

        if (!isPaused) {
          time.paused += +new Date() - time.pause;

          processTime();
        } else {
          time.pause = +new Date()
        }
      },
      stop: function () {
        isActive = 0;
        clearTimeout(timer);

        time = { paused: 0, pause: 0 }
      },
      reset: function () {
        this.stop();

        update(formatTime(0))
      }
    }
  }();
  
  countDownTimer.start(1*60*1000);
}(window, document, Date));