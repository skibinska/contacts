'use strict';
module.exports = function(grunt) {
	var tasks = [
		'clean:dist',
		'includes:files',
		'preprocess',
		'ngconstant',
		'compass:dist',
		'wiredep',
		'useminPrepare',
		'html2js:main',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'cssmin',
		'uglify',
		'rev',
		'usemin',
		'htmlmin'
	];
	grunt.registerTask('buildMinified', tasks);
};
