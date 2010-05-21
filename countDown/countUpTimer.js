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
        pad = function (n) {
          var l;
          return (n = '0' + n, l = n.length, n.substr(l-2, l));
        },
        formatTime = function (rawTime) {
          var inSecs = rawTime / 1000,
              inMins = Math.floor(inSecs / 60),
              inHrs = Math.floor(inMins / 60);

          inSecs = inSecs % 60;
          inMins = inMins % 60;
          
          return pad(inHrs) + " : " + pad(Math.floor(inMins)) + " : " + pad(Math.floor(inSecs));
        }, timer,
        time = {},
        processTime = function () {
          time.elasped = (+new Date()) - time.start;
          if (time.elasped < time.limit) {
            setTimeout(arguments.callee, 100)
          }
          update(formatTime(time.elasped));
        }, update = function (time) {
          displayElem.innerHTML = time;
        };
    win._t = time;
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
  
  countDownTimer.start(5*60*1000);
  
}(window, document, Date));