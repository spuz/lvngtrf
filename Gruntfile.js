module.exports = function(grunt) {

  require('jit-grunt')(grunt);          // https://jonsuh.com/blog/take-grunt-to-the-next-level/
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jekyll: {
      build: {
        options: {
          config: '_config.yml'
        }
      },
      production: {
        options: {
          config: '_PROD.config.yml, _config.yml'
        }
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'assets/scss',
          cssDir: 'assets/css',
          environment: 'development',
          outputStyle: 'expanded',
          require: 'breakpoint',
          noLineComments: false,
          watch: true
        }
      },
      production: {
        options: {
          sassDir: 'assets/scss',
          cssDir: 'assets/css',
          environment: 'production',
          outputStyle: 'compressed',
          require: 'breakpoint',
          noLineComments: true,
          watch: false
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
          'assets/css/*.css',
          '*.md',
        ],
        tasks: ['jekyll:build']
      }
    },

    concurrent: {
      target: {
        tasks: [
          'compass:dev',
          'watch'
        ],
        options: {
          logConcurrentOutput: true,
          livereload: true
        }
      }
    }

  });


  // grunt.loadNpmTasks('grunt-jekyll');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('prod', [
    'compass:production',
    'jekyll:production'
  ]);

  grunt.registerTask('default', [
    'concurrent:target'
  ]);
}
