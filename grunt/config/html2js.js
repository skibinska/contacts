'use strict';

//https://github.com/karlgoldstein/grunt-html2js

module.exports = {

	options: {
		base: 'app',
		module: 'platformTemplates',
		singleModule: true,
		useStrict: true,
		watch: true,
		htmlmin: {
			collapseBooleanAttributes: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}
	},
	main: {
		src: ['app/views/**/*.html'],
		dest: 'public/scripts/templateCache.js'
	}

};
