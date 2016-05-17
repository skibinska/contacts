'use strict';
module.exports = function (grunt, options) {
	var preprocessorConfig = {
		options: {
			context: {
				platform: options.platform,
				environment: options.environment
			}
		},
		html : {
			src : options.tmp + '/index.html',
			dest : options.dist + '/index.html'
		}
	};
	return preprocessorConfig;
};
