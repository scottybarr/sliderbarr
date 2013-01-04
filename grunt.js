/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
    coffee: {
      src: 'src/coffee',
      dest: 'dist'
    },
    compass: {
      src: 'src'
    },
    min: {
      dist: {
        src: 'dist/sliderbarr.js',
        dest: 'dist/sliderbarr.min.js'
      }
    },
    jasmine : {
      src : 'dist/sliderbarr.js',
      specs : 'test/spec/*.spec.js',
      helpers : '',
      timeout : 10000,
      phantomjs : {
        'ignore-ssl-errors' : true
      }
    },
    watch: {
      coffee: {
        files : 'src/coffee/*.coffee',
        tasks: 'coffee min'
      },
      compass: {
        files: 'src/sass/*.scss',
        tasks: 'compass'
      }
    },
    uglify: {}
    });

  grunt.loadNpmTasks('grunt-jasmine-runner');

  var exec = function(cmd, done) {
    require('child_process').exec(cmd, function (error, stdout, stderr) {
      if (stderr) {
        console.log(stderr);
      }
      if (stdout) {
        console.log(stdout);
      }
      done(error === null);
    });
  };

  var coffee = function(src, dest, done) {
      exec('coffee -o ' + dest + ' -c ' + src, done);
  };

  var compass = function(src, done) {
      exec('compass compile ' + src, done);
  };

  grunt.registerTask('coffee', 'Compile CoffeeScript files', function () {
    coffee(grunt.config.get(this.name).src, grunt.config.get(this.name).dest, this.async());
  });

  grunt.registerTask('compass', 'Compile Compass', function() {
    compass(grunt.config.get(this.name).src, this.async());
  });

  // Default task.
  grunt.registerTask('default', 'coffee compass jasmine min');

};
