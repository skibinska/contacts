'use strict';

module.exports = {
	dist      : {
		files: [
			{
				expand: true,
				dot   : true,
				cwd   : '<%= appBasePath %>',
				dest  : '<%= dist %>',
				src   : [
					'*.html',
					'!index.html',
					'views/**/*.html',
					'images/**/*.{webp}',
					'styles/fonts/*'
				]
			},
			{
				expand : true,
				flatten: true,
				cwd    : '<%= appBasePath %>',
				dest   : '<%= dist %>/static-styles',
				src    : 'styles/*.css'
			},
			{
				expand: true,
				cwd   : '<%= appBasePath %>/images',
				dest  : '<%= dist %>/images/',
				src   : ['**']
			},
			{
				expand : true,
				flatten: true,
				cwd    : '<%= appBasePath %>',
				dest   : '<%= dist %>',
				src    : 'images/<%= platform %>/*.{ico,xml}'
			},
			{
				expand : true,
				flatten: true,
				cwd    : '<%= appBasePath %>',
				dest   : '<%= dist %>',
				src    : 'config/<%= platform %>/google-site-verification/*'
			},
			{
				expand : true,
				flatten: true,
				cwd    : '<%= appBasePath %>',
				dest   : '<%= dist %>',
				src    : 'config/<%= platform %>/robots/<%= environment %>.txt',
				rename : function (dest) {
					return dest + '/robots.txt';
				}
			},
			{
				expand: true,
				flatten: true,
				cwd   : '.',
				src   : 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
				dest  : '<%= dist %>/fonts'
			},
			{
				expand: true,
				flatten: true,
				cwd   : '.',
				src   : ['bower_components/font-awesome/fonts/*.*'],
				dest  : '<%= dist %>/fonts/'
			}
		]
	},
	nonMinified     : {
		files: [
			{
				expand: true,
				cwd   : '<%= appBasePath %>/scripts/',
				src   : ['**/*.spec.js', '!**/dev-template/**/*.*'],
				dest  : 'tests/spec'
			},
			{
				expand: true,
				cwd   : '.tmp/styles/',
				src   : '**/*.css',
				dest  : '<%= dist %>/styles/'
			},
			{
				expand: true,
				cwd   : 'bower_components/',
				src   : ['**/*.js','**/*.css'],
				dest  : '<%= dist %>/bower_components/'
			},
			{
				expand: true,
				cwd   : '.',
				src   : 'bower_components/font-awesome/fonts/*.*',
				dest  : '<%= dist %>'
			}
		]
	},
	styles    : {
		expand: true,
		cwd   : '<%= tmp %>/styles',
		dest  : '<%= dist %>/styles',
		src   : '**/*.css'
	}
};
