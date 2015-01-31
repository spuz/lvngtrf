module.exports = function(grunt) {

  require('jit-grunt')(grunt);          // https://jonsuh.com/blog/take-grunt-to-the-next-level/
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jekyll: {
      build: {
        options: 'config.yml'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production',
          outputStyle: 'compressed',
          noLineComments: true,
          watch: false
        }
      },
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'development',
          outputStyle: 'expanded',
          noLineComments: false,
          watch: true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      jekyll: {
        files: [
          '_includes/*.html',
          '_posts/*.markdown',
          '_posts/*.md',
          'index.html',
          '_config.yml',
          'css/*.css'
        ],
        tasks: ['jekyll']
      }
    },

    concurrent: {
      target: {
        tasks: [
          'compass:dev',
          'watch'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });


  // grunt.loadNpmTasks('grunt-jekyll');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'concurrent:target',
    'compass'
  ]);
}
