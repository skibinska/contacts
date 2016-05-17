'use strict';
module.exports = function (grunt, options) {
	var watchConfig = {
		bower    : {
			files: ['bower.json'],
			tasks: ['wiredep']
		},
		jsTest   : {
			files: ['tests/spec/{,*/}*.js'],
			tasks: ['newer:jshint:test', 'karma']
		},
		compass  : {
			files: [
				'app/styles/**/*.{scss,sass}'
			],
			tasks: ['compass:server',  'copy:styles']
		},
		gruntfile: {
			files: [ options.gruntfile, 'grunt/**/*.js']
		},
		js       : {
			files  : [
				'app/scripts/**/*.js'
			],
			tasks  : ['ngAnnotate:nonMinified', 'newer:jshint:all'],
			options: {
				livereload: options.livereloadPort
			}
		},
		index: {
			files: ['app/index.html'],
			tasks: ['preprocess','wiredep']
		},
		livereload: {
			options: {
				livereload: options.livereloadPort,
				spawn     : false
			},
			files  : [
				'app/**/*.html',
				options.dist + '/styles/**/*.css',
				options.dist + '/config/**/*',
				'app/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
			],
			tasks: ['html2js:main']
		}
	};
	//console.log('watchconfig', watchConfig);
	return watchConfig;
};
