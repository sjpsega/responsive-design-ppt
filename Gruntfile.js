module.exports = function( grunt ) {

	"use strict";

	var distpaths = [
			"dist/jquery.js",
			"dist/jquery.min.map",
			"dist/jquery.min.js"
		],
		readOptionalJSON = function( filepath ) {
			var data = {};
			try {
				data = grunt.file.readJSON( filepath );
			} catch(e) {}
			return data;
		};

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		dst: readOptionalJSON("dist/.destination.json"),
		jade: {
	      debug: {
	        options: {
	          pretty: true
	        },
	        files: {
	          "index.html": "jade/index.jade"
	        }
	      }
	    },
	    connect:{
	 		server: {
	 			options:{
	 				port: 80,
		      		base: '.'
	 			}
		    }
	    },
		watch: {
	      jade: {
	        files: ['jade/*.jade','jade/**/*.jade'],
	        tasks: 'jade'
	      }
	    }
	});
	// Load grunt tasks from NPM packages
	grunt.loadNpmTasks("grunt-compare-size");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-jade");
	grunt.loadNpmTasks("grunt-contrib-stylus");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-mincss");

	// Default grunt
	// grunt.registerTask( "default", ["mincss"] );
	grunt.registerTask( "default", ["jade", "connect", "watch"] );

	// Short list as a high frequency watch task
	// grunt.registerTask( "dev", [ "selector", "build:*:*", "jshint" ] );
};
