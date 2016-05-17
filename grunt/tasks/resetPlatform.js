'use strict';

module.exports = function(grunt) {
	var tasks = [
		'clean:dist',
		'includes:files',
		'preprocess',
		'ngconstant',
		'wiredep'
	];
	grunt.registerTask('resetPlatform', tasks);
};

