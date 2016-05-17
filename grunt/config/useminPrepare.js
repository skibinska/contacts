'use strict';
module.exports = {
	html   : '<%= dist %>/index.html',
	options: {
		dest: '<%= dist %>',
		flow: {
			html: {
				steps: {
					js : ['concat', 'uglifyjs'],
					css: ['cssmin']
				},
				post : {}
			}
		}
	}
};
