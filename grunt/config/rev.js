'use strict';
module.exports = {
	options: {
		algorithm: 'md5',
		length   : 5
	},
	dist   : {
		files: {
			src: [
				'<%= dist %>/scripts/**/*.js',
				'<%= dist %>/styles/**/*.css',
			]
		}
	}
};
