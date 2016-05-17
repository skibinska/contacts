'use strict';
module.exports = function(grunt) {
	var tasks = [
		'connect:testDev',
		'karma'
	];
	grunt.registerTask('runUnitTests', tasks);
};

