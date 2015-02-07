module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			jsx: {
				files: ['react/**/*.jsx'],
				tasks: ['browserify']
			},
			css: {
				files: ['public/**/*.less'],
				tasks: ['less']
			}
		},
		browserify: {
			options: {
				transform: [ require('grunt-react').browserify ]
			},
			jsx: {
				src: ['react/**/*.jsx'],
				dest: 'public/js/browserify/bundle.js'
			}
		},
		less: {
			development: {
				files: {'public/css/style.css': 'public/css/style.less'}
			}
		},
		nodemon: {
			dev: {
				script: 'app.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', [
		'browserify',
		'less',
		'nodemon'
	]);
};
