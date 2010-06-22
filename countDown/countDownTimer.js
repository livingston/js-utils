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
        }, timer,
        time = {},
        processTime = function () {
          time.elasped = (+new Date()) - time.start;
          if (time.elasped < time.limit) {
            setTimeout(processTime, 250)
          }
          update(formatTime(time.limit - time.elasped));
        }, update = function (time) {
          displayElem.innerHTML = time;
        };

    doc.getElementsByTagName('body')[0].appendChild(displayElem);
    
    return {
      time: function () {},
      start: function (limit) {
        time.start = +new Date();
        time.limit = limit;
        
        processTime();
      },
      pause: function () {},
      stop: function () {},
      reset: function () {}
    }
  }();
  
  countDownTimer.start(1*60*1000);
  
}(window, document, Date));