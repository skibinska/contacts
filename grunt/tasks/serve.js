'use strict';
module.exports = function(grunt) {
	var tasks = [
		'clean',
		'includes:files',
		'preprocess',
		'wiredep',
		'ngconstant',
		'concurrent:server',
		'connect:livereload',
		'html2js:main',
		'ngAnnotate:nonMinified',
		'copy:styles',
		'watch'
	];
	grunt.registerTask('serve', function () {
		grunt.task.run(tasks);
	});
};

