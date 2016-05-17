'use strict';

module.exports = function (grunt, options) {

	var jsConfig = [];
	var jsConfigSourceFile = 'app/config/config.json';
	var jsConfigDestinationFile = options.dist + '/scripts/config.js';

	if (grunt.file.exists('app/config/')) {
		
		console.log('sourcefile is ' + jsConfigSourceFile);
		console.log('destfile is ' + jsConfigDestinationFile);

		var readConfig = grunt.file.readJSON(jsConfigSourceFile);
		jsConfig = {
			build: grunt.template.today("yyyy-mm-dd"),
			design: readConfig.design,
			env: options.environment,
			navigation: grunt.file.readJSON('app/config/navigation.json').navigation,
			platform: options.platform,
			settings: readConfig.settings,
			web: readConfig.web[options.environment]
		};
	}

	return {
		options: {
			name: 'platformConfig',
			wrap: '\'use strict\';\n{%= __ngModule %}'
		},
		dist: {
			options: {
				expand: true,
				dest: jsConfigDestinationFile
			},
			constants: {
				config: jsConfig
			}
		}
	}
};
