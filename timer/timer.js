/*!
 * timer.js
 * @author Livingston Samuel - http://livingstonsamuel.com/
 * @license MIT License

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

		this.list = [];
		this.isActive = false;
	};

	Timer.prototype.start = function () {
		this.startTime = +new Date();
		this.isActive = true;
		this.stopTime = null;
	};

	Timer.prototype.elasped = function () {
		if(!this.startTime) { 
			this.throwException();
		}

		return (this.stopTime ? (this.stopTime - this.startTime) : (+new Date() - this.startTime)) / 1000;
	};

	Timer.prototype.stop = function () {
		if(!this.startTime || !this.isActive) { 
			this.throwException();
		}

		var elaspedTime = this.elasped();
		this.stopTime = +new Date();
		this.isActive = false;
		this.list.push(elaspedTime);

		return elaspedTime;
	};

	Timer.prototype.throwException = function () {
		throw new Error('Timer is not active.');
	};

	win.Timer = Timer;
}(window, document, Date));