'use strict';

module.exports = {
	options: {
		jshintrc: '.jshintrc',
		reporter: require('jshint-stylish')
	},
	all    : [
		'Gruntfile.js',
		'<%= appBasePath %>/scripts/**/*.js',
		'!<%= appBasePath %>/scripts/vendor/**/*.js'
	],
	test   : {
		options: {
			jshintrc: 'tests/.jshintrc'
		},
		src    : ['tests/spec/**/*.js']
	}
};
