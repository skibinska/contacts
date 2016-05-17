'use strict';

module.exports = function(grunt) {
	var tasks = [
		'clean:server',
		'includes:files',
		'preprocess',
		'wiredep',
		'ngconstant',
		'concurrent:test',
		'html2js:main',
		'connect:test',
		'karma'
	];
	grunt.registerTask('test', tasks);
};

