'use strict';
module.exports = {
	dist: {
		files: [{
			expand: true,
			cwd   : '.tmp/concat/scripts',
			src   : '*.js',
			dest  : '.tmp/concat/scripts'
		}]
	},
	nonMinified : {
		files: [{
			expand: true,
			cwd   : '<%= appBasePath %>/scripts/',
			src   : ['**/*.js', '!**/*.spec.js', '!dev-template/**/*.*'],
			dest  : '<%= dist %>/scripts/'
		}]
	}
};
