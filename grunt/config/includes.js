'use strict';

module.exports = function (grunt, options) {
	var preprocessorConfig = {
		files: {
			src: ['app/index.html'],
			dest: options.tmp,
			cwd: '.',
			flatten: true
		}
	};
	return preprocessorConfig;
};
