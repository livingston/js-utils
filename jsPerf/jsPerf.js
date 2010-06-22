/* JavaScript Codeblock Performance Analyzer
 * @author - Livingston Samuel
 */
 
var jsPerf = {
	getTime: function () { return (new Date()).getTime(); },
	measure: function (name, codeBlock, options) {
		var count = (options && options.iterations) ? parseInt(options.iterations, 10) : 0,
			fn = codeBlock,
			iterations,
			startTime = jsPerf.getTime();
		
		if((!options || !options.crossLimit) && (count > 1000000 || count < 1)) count = 10;
		iterations = count;
		
		while (count--) {
			fn();
		}
		
		return (options && options.raw) ? (jsPerf.getTime() - startTime) : (name + ' - for ' + iterations + ' iterations took ' + (jsPerf.getTime() - startTime) + ' ms to execute.');	
	},
	compare: function (scenarios) {
		var scenario, scenarioFuncs, func, options;

		for ( scenario in scenarios ) {
			if(scenarios.hasOwnProperty(scenario)) {
				scenario = scenarios[scenario];
				scenarioFuncs = scenario.fn;
        options = scenario.options || {};

				for(func in scenarioFuncs) {
					if(scenarioFuncs.hasOwnProperty(func)) {
						console.log(jsPerf.measure(func, scenarioFuncs[func], options));
					}
				}
			}
		}
	}
};

var scenarios = {
	"select all elements": {
		fn: {
			'qsa': function () { document.querySelectorAll('*'); },
			'gebtn': function () { document.getElementsByTagName('*'); }
		},
		options: {
			iterations: 10000
		}
	}
};

jsPerf.compare(scenarios);