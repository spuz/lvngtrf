module.exports = function(grunt) {

  require('jit-grunt')(grunt);          // https://jonsuh.com/blog/take-grunt-to-the-next-level/
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jekyll: {
      build: {
        options: {
          dest: 'dev',
          config: '_config.yml'
        }
      },
      production: {
        options: {
          dest: 'dist',
          config: '_config.yml,_PROD.config.yml'
        }
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'src/assets/scss',
          cssDir: 'src/assets/css',
          environment: 'development',
          outputStyle: 'expanded',
          require: 'breakpoint',
          noLineComments: false,
          watch: true
        }
      },
      production: {
        options: {
          sassDir: 'src/assets/scss',
          cssDir: 'src/assets/css',
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
          'src/_layouts/*.html',
          'src/_includes/*.html',
          'src/_posts/*.markdown',
          'src/_posts/*.md',
          'src/index.html',
          'src/_config.yml',
          'src/assets/css/*.css',
          'src/*.md',
          'src/images'
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
