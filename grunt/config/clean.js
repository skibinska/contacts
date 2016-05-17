'use strict';

module.exports = {
	dist  : {
		files: [{
			dot: true,
			src: [
				'.tmp',
				'tests/spec',
				'<%= dist %>/*',
				'!<%= dist %>/.git*'
			]
		}]
	},
	server: '.tmp'
};
