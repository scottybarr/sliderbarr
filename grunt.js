/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
    coffee: {
      src: 'src/coffee',
      dest: 'dist'
    },
    compass: {
      src: 'src/sass',
      dest: 'dist/css',
      outputstyle: 'compressed',
      linecomments: false,
      forcecompile: true,
      debugsass: false,
      images: 'images',
      relativeassets: true
    },
    min: {
      dist: {
        src: 'dist/sliderbarr.js',
        dest: 'dist/sliderbarr.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
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

  grunt.loadNpmTasks('grunt-compass');

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

  grunt.registerTask('coffee', 'Compile CoffeeScript files', function () {
    coffee(grunt.config.get(this.name).src, grunt.config.get(this.name).dest, this.async());
  });

  // Default task.
  grunt.registerTask('default', 'coffee compass qunit min');

};
