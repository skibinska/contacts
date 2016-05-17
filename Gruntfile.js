'use strict';

module.exports = function (grunt) {

	var path = require('path');

	var platform = 'babylon';
	var environment = 'local';

	var karmaConfig = 'tests/karma.conf.js';
	var appBasePath = path.join(process.cwd(), 'app');

	var gruntConfigLoaderParams = {
		configPath: path.join(process.cwd(), 'grunt/config'),
		jitGrunt: {
			customTasksDir: 'grunt/tasks',
			staticMappings: {
				ngconstant: 'grunt-ng-constant',
				useminPrepare: 'grunt-usemin'
			}
		},
		data: {
			gruntfile: 'Gruntfile.js',
			appBasePath: appBasePath,
			dist: 'public',
			tmp: '.tmp',
			platform: platform,
			environment: environment,
			livereloadPort: 35729,
			connectPort: 9001,
			hostname: '*',
			karmaConfig: karmaConfig
		}
	};

	require('load-grunt-config')(grunt, gruntConfigLoaderParams);
	require('time-grunt')(grunt);
};
