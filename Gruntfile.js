module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			options: {
				transform: [ require('grunt-react').browserify ]
			},
			client: {
				src: ['react/**/*.jsx'],
				dest: 'public/js/browserify/bundle.js'
			}
		},
		watch: {
			files: [ 'react/**/*.jsx'],
			tasks: [ 'browserify' ]
		},
		nodemon: {
			dev: {
				script: 'app.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', [
		'browserify',
		'nodemon'
	]);
};
