'use strict';

module.exports = {
	dist: {
		options: {
			keepClosingSlash         : true,
			collapseWhitespace       : true,
			collapseBooleanAttributes: true,
			removeCommentsFromCDATA  : true
		},
		files  : [{
			expand: true,
			cwd   : '<%= dist %>',
			src   : ['*.html', 'views/**/*.html'],
			dest  : '<%= dist %>'
		}]
	}
};
