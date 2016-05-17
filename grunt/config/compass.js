'use strict';

module.exports = {
	options: {
		sassDir                : '<%= appBasePath %>/styles/',
		cssDir                 : '.tmp/styles',
		generatedImagesDir     : '.tmp/images/generated',
		imagesDir              : '<%= appBasePath %>/images',
		javascriptsDir         : '<%= appBasePath %>/scripts',
		fontsDir               : '<%= appBasePath %>/styles/fonts',
		importPath             : './bower_components',
		httpImagesPath         : '/images',
		httpGeneratedImagesPath: '/images/generated',
		httpFontsPath          : '/styles/fonts',
		relativeAssets         : false,
		assetCacheBuster       : false,
		debugInfo              : true,
		raw                    : 'Sass::Script::Number.precision = 10\n'
	},
	dist   : {
		options: {
			generatedImagesDir: '<%= dist %>/images/generated'
		}
	},
	server : {
		options: {
			debugInfo: true
		}
	}
};
