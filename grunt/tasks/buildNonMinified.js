'use strict';
module.exports = function(grunt) {
	var tasks = [
		'clean:dist',
		'includes:files',
		'preprocess',
		'ngconstant:dist',
		'wiredep',
		'html2js:main',
		'compass:dist',
		'copy:dist',
		'copy:nonMinified',
		'ngAnnotate:nonMinified'
	];

	grunt.registerTask('buildNonMinified', tasks);
};
