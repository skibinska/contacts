'use strict';
var modRewrite = require('connect-modrewrite');

module.exports = function (grunt, options) {
	return {
		options   : {
			port      : options.connectPort,
			// Change this to '0.0.0.0' to access the server from outside.
			hostname  : options.hostname,
			livereload: options.livereloadPort,
		},
		livereload: {
			options: {
				open      : false,
				middleware: function (connect) {
					return [
						modRewrite(['^[^\\.]*$ /index.html [L]']),
						//connect.static('.tmp'),
						connect().use('/bower_components', connect.static('./bower_components')),
						//connect().use('/.tmp/styles', connect.static('./.tmp/styles')),
						connect().use('/scripts', connect.static(options.dist+'/scripts')),
						// connect().use('/app/styles', connect.static('./app/styles')),
						connect.static(options.dist),
						connect.static(options.appBasePath)
					];
				}
			}
		},
		test      : {
			options: {
				port      : 9002,
				middleware: function (connect) {
					return [
						connect.static('.tmp'),
						connect.static('tests'),
						connect().use('/bower_components',	connect.static('./bower_components')),
						connect.static(options.dist),
						connect.static(options.appBasePath)
					];
				}
			}
		},
		testDev   : {
			options: {
				port      : options.connectPort,
				middleware: function (connect) {
					return [
						connect.static('tests'),
						connect.static(options.dist)
					];
				}
			}
		},
		dist      : {
			options: {
				base: options.dist
			}
		}
	};
};
