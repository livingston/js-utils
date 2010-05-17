/* Javascript Codeblock Performance Anlalyzer
 * @author - Livingston Samuel
 */
 
var jsPerf = {
	getTime: function () { return (new Date()).getTime(); },
	measure: function (name, codeBlock, options) {
		var count = (options && options.iterations) ? parseInt(options.iterations, 10) : 0,
			fn = codeBlock,
			iterations,
			startTime = jsPerf.getTime();
		
		if((!options || !options.crossLimit) && (count > 1000000 || count < 1)) count = 1000;
		iterations = count;
		
		while (--count) {
			fn();
		}
		
		return (options && options.raw) ? (jsPerf.getTime() - startTime) : (name + ' - for ' + iterations + ' iterations took ' + (jsPerf.getTime() - startTime) + ' ms to execute.');	
	}
};