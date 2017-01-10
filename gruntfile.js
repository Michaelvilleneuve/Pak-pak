module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'public/assets/js/vendor/*.js',
          'public/assets/js/*.js',
          'node-modules/socket.io/lib/*.js',
        ],
        dest: 'public/assets/build/main.js'
      }
    },
    watch: {
      scripts: {
        files: ['public/assets/js/*.js', ],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'sass']);

};