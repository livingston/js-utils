/* JavaScript Codeblock Performance Anlalyzer
 * @author - Livingston Samuel
 */
 
var jsPerf = {
	getTime: function () { return (new Date()).getTime(); },
	measure: function (name, codeBlock, iterations) {
		var count = (iterations) ? parseInt(iterations, 10) : 0,
			fn = codeBlock,
			startTime = jsPerf.getTime();
		
		if(count > 1000000 || count < 1) count = 1000;
		iterations = count;
		
		while (--count) {
			fn();
		}
		
		return name + ' - for ' + iterations + ' iterations took ' + (jsPerf.getTime() - startTime) + ' ms to complete';	
	}
};