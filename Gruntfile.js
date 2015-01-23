module.exports = function(grunt) {

  require('jit-grunt')(grunt);          // https://jonsuh.com/blog/take-grunt-to-the-next-level/
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

  });


  // grunt.loadNpmTasks('grunt-jekyll');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', []);
}
