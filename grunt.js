/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    coffee: {
        dist: {
            dir: 'src/coffee',
            dest: 'dist'
        }
    },
    compass: {
        dist: {
            dir: 'src/sass',
            dest: 'dist/css',
            outputstyle: 'compressed',
            linecomments: false
        }
    },
    min: {
      dist: {
        src: ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      files: ['<config:lint.files>', '<config:coffee.dist.files>', 'sass/*.scss'],
      tasks: 'lint qunit coffee:dist ok compass:dist'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
    });
    
    var exec = require('child_process').exec;
    var log = grunt.log;
    
    // child_process.exec bridge
    grunt.registerHelper('exec', function(opts, done) {
        var command = opts.cmd + ' ' + opts.args.join(' ');
        log.writeln('command was ' + command);
        exec(command, opts.opts, function(code, stdout, stderr) {
          if(!done){
            return;
          }
          if(code === 0) {
            done(null, stdout, code);
          } else {
            done(code, stderr, code);
          }
        });
    });
 
    function handleResult(from, dest, err, stdout, code, done) {
        if(err){
          log.writeln(from + ': failed to compile to ' + dest + '.');
          log.writeln(stdout);
          done(false);
        }else{
          log.writeln(from + ': compiled to ' + dest + '.');
          done(true);
        }
    }

    grunt.registerHelper('coffee_dir_to_dir', function(fromdir, dest, done) {
        var args = {
          cmd: 'coffee',
          args: ['-o', dest, '-c', fromdir]
        };
        grunt.helper('exec', args, function(err, stdout, code){
          handleResult(fromdir, dest, err, stdout, code, done);
        });
    });

    grunt.registerMultiTask('coffee', 'compile coffeeScript', function() {

        var done = this.async();
        var dir = this.data.dir;
        var dest = this.data.dest;

        // ex: ./coffee -> ./js
        if(dir) {
          
          // if destination was not defined, compile to same dir
          if(!dest) {
            dest = dir;
          }

          grunt.helper('coffee_dir_to_dir', dir, dest, done);
          return;
        }

    });
    
    grunt.registerHelper('compile_sass', function(fromdir, dest, outputstyle, done) {
        var args = {
          cmd: 'compass',
          args: ['compile src --no-line-comments', '--output-style', outputstyle]
        };
        grunt.helper('exec', args, function(err, stdout, code){
          handleResult(fromdir, dest, err, stdout, code, done);
        });
    });
    
    grunt.registerMultiTask('compass', 'compile sass', function() {
        var done = this.async();
        var dir = this.data.dir;
        var dest = this.data.dest;
        var outputstyle = this.data.outputstyle;
        
        if (dir) {
            if (!dest) {
                dest = dir;
            }
            
            grunt.helper('compile_sass', dir, dest, outputstyle, done);
            return;
        }
    });

  // Default task.
  grunt.registerTask('default', 'coffee compass qunit min');




};
