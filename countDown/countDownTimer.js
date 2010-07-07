/*! countDown Timer
 *
 * @version 2
 * @author Livingston Samuel
 * @license MIT License
 *
 */

(function (win, doc, Date) {
  var bodyElem = doc.getElementsByTagName('body')[0],
      countDownTimer = function () {
        var displayElem = doc.createElement('div'),
            pad = function (num, len) {
              return (num = '0' + num, len = num.length, num.substr(len-2, len));
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

        bodyElem.appendChild(displayElem);

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
            if (!isActive) { return; }
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
            isPaused = 0;
            clearTimeout(timer);

            time = { paused: 0, pause: 0 }
          },
          reset: function () {
            this.stop();

            update(formatTime(0))
          }
        }
      }(),
      Bind = (function () {
        if (win.addEventListener) {
          return function (elem, evt, fn) {
            elem.addEventListener(evt, fn, false)
          }
        } else if (win.attachEvent) {
          return function (elem, evt, fn) {
            elem.attchEvent('on' + evt, fn)
          }
        } else {
          return function (elem, evt, fn) {
            var evnt = 'on' + evt,
                oldFn = elem[evnt];

            elem[evnt] = function () {
              if (oldFn) {
                oldFn()
              }

              fn()
            }
          }
        }
      }());
      setupControls = function () {
        var holder = doc.createElement('fieldset'),
            button = doc.createElement('button'),
            startButton = button.cloneNode(false),
            pauseButton = button.cloneNode(false),
            stopButton = button.cloneNode(false),
            resetButton = button.cloneNode(false);

        startButton.id = 'start';
        startButton.innerHTML = 'Start';
        pauseButton.id = 'pause';
        pauseButton.innerHTML = 'Pause';
        stopButton.id = 'stop';
        stopButton.innerHTML = 'Stop';
        resetButton.id = 'reset';
        resetButton.innerHTML = 'Reset';

        Bind(startButton, 'click', function () {
          var time = parseInt(prompt('Please Enter the time to count down (in mins)', 1), 10) * 60 * 1000;

          countDownTimer.start(time);
        });

        Bind(pauseButton, 'click', countDownTimer.pause);
        Bind(stopButton, 'click', countDownTimer.stop);
        Bind(resetButton, 'click', function () { countDownTimer.reset() });

        holder.appendChild(startButton);
        holder.appendChild(pauseButton);
        holder.appendChild(stopButton);
        holder.appendChild(resetButton);
        bodyElem.appendChild(holder);
      };

  setupControls();
  //countDownTimer.start(1*60*1000);
}(window, document, Date));