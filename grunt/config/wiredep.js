'use strict';
module.exports = function (grunt, options) {

	var dependencies = {
		'angular-i18n': '*',
		'jcrop'       : '*'
	};
	var overrides    = {
		'angular-i18n': {
			'main': 'angular-locale_en-gb.js'
		},
		'jcrop': {
			'main': [
				'js/jquery.Jcrop.js',
				'css/jquery.Jcrop.cs'
			]
		},
		'outlayer' : {
			'main': ['']
		},
		'masonry': {
			'main': ['dist/masonry.pkgd.js']
		}
	};
	var conf = {
		app : {
			src         : [options.dist+'/index.html'],
			ignorePath  : /\.\.\//,
			dependencies: dependencies,
			overrides   : overrides
		},
		sass: {
			src         : [options.appBasePath+'/styles/**/*.{scss,sass}'],
			ignorePath  : /(\.\.\/){1,2}bower_components\//,
			dependencies: dependencies,
			overrides   : overrides
		},
		test: {
			devDependencies: true,
			src            : options.karmaConfig,
			ignorePath     : /\.\.\//,
			fileTypes      : {
				js: {
					block  : /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
					detect : {
						js: /'(.*\.js)'/gi
					},
					replace: {
						js: '\'{{filePath}}\','
					}
				}
			},
			dependencies   : dependencies,
			overrides      : overrides
		}
	};

	return conf;
};
