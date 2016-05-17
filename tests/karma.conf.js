module.exports = function (config) {
	'use strict';

	var karmaConfig = {
		autoWatch: true,

		basePath: '../',

		frameworks: ['jasmine', 'jasmine-matchers'],
		files: [
			// bower:js
			'bower_components/es5-shim/es5-shim.js',
			'bower_components/jquery/dist/jquery.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-animate/angular-animate.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
			'bower_components/angular-capitalize-filter/capitalize.js',
			'bower_components/angular-confirm-modal/angular-confirm.js',
			'bower_components/angular-cookies/angular-cookies.js',
			'bower_components/angular-css/angular-css.js',
			'bower_components/angular-file-upload/dist/angular-file-upload.min.js',
			'bower_components/moment/moment.js',
			'bower_components/angular-moment/angular-moment.js',
			'bower_components/jquery-html5-placeholder-shim/jquery.html5-placeholder-shim.js',
			'bower_components/angular-placeholder-shim/angular-placeholder-shim.js',
			'bower_components/angular-sanitize/angular-sanitize.js',
			'bower_components/angular-ui-bootstrap-fontawesome/dist/ui-bootstrap-fontawesome-latest.js',
			'bower_components/fullcalendar/dist/fullcalendar.js',
			'bower_components/angular-ui-calendar/src/calendar.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-ui-select/dist/select.js',
			'bower_components/jquery-ui/jquery-ui.js',
			'bower_components/angular-ui-sortable/sortable.js',
			'bower_components/AngularJS-Toaster/toaster.js',
			'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
			'bower_components/html5shiv/dist/html5shiv.js',
			'bower_components/jcrop/js/jquery.Jcrop.js',
			'bower_components/json3/lib/json3.js',
			'bower_components/jquery-cookie/jquery.cookie.js',
			'bower_components/ng-file-upload/ng-file-upload.js',
			'bower_components/ng-file-upload-shim/ng-file-upload-shim.js',
			'bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
			'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
			'bower_components/ui-select/dist/select.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-ipsum/dist/ipsum.min.js',
			// endbower
		],

		port: 9876,

		browsers: [
			'PhantomJS'
		],

		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-mocha-reporter',
			'karma-coverage',
			'karma-jasmine-matchers'
		],

		colors: true,

		reporters: ['dots', 'coverage'],

		preprocessors: {
			'app/scripts/**/!(*.spec).js': ['coverage']
		},
		coverageReporter: {
			type: 'html',
			dir: './tests/coverage/'
		},

		captureTimeout: 60000,

		singleRun: false,

		loggers: [{type: 'console'}],

		logLevel: config.LOG_INFO,

		proxies: {
			'/images/': '/base/app/images/'
		}
	};

	karmaConfig.files = karmaConfig.files.concat([
		'app/scripts/babylon.module.js',
		'app/scripts/babylon.config.js',
		'app/scripts/**/*.module.js',
		'public/scripts/config.js',
		'public/scripts/templateCache.js',
		'app/scripts/**/*.js', {
			pattern: '**/*.spec.js',
			included: false
		},
		{pattern: 'app/images/**/*.png', watched: false, included: false, served: true, nocache: false}
	]);

	karmaConfig.exclude = [
		'app/bower_components/angular-scenario/angular-scenario.js',
		'app/scripts/dev-template/**/*.*'
	];


	config.set(karmaConfig);
};
