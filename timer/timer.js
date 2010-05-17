/*
 * timer.js - Version 1.2
 *
 * @author Livingston Samuel - http://livingstonsamuel.com/
 *
 * @license MIT License

Copyright (c) 2010 Livingston Samuel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 */

;(function (win, doc, Date) {
	var Timer = function () {
		if( !( this instanceof arguments.callee ) ) {
			return new Timer();
		}

		var CLASS = arguments.callee, startTime, stopTime, timeList = [],
		fn = {
			"start": function () {
				startTime = (new Date()).getTime();
				stopTime = null;

				CLASS.prototype.stop = fn.stop;
				CLASS.prototype.elasped = fn.elasped;

				delete CLASS.prototype.start;
			},
			"elasped": function () {
				return (stopTime ? (stopTime - startTime) : ((new Date()).getTime() - startTime)) / 1000;
			},
			"stop": function () {
				stopTime = (new Date()).getTime();

				delete CLASS.prototype.stop;
				CLASS.prototype.start = fn.start;
				CLASS.prototype.list = fn.list;
				timeList.push(fn.elasped());

				return fn.elasped();
			},
			"list": timeList
		};

		CLASS.prototype.start = fn.start;
	};

	window.Timer = Timer;
}(window, document, Date));