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
          ['public/assets/js/sounds.js', 'public/assets/js/Player.js', 'public/assets/js/*.js'],
        ],
        dest: 'public/assets/build/main.js'
      }
    },
    es6transpiler: {
      dist: {
        src: 'public/assets/build/main.js'
        , dest: 'public/assets/build/main.js'
      },
      options: {
        "disallowUnknownReferences": false // for allowjQuery
      }
    },
    uglify: {
      dist: {
        files: {
          'public/assets/build/main.min.js': ['public/assets/build/main.js']
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/assets/build/main.css': 'public/assets/css/main.scss'
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'public/assets/build/main.min.css': ['public/assets/build/main.css']
        }
      }
    },
    watch: {
      scripts: {
        files: ['public/assets/js/*.js', 'public/assets/css/*.scss'],
        tasks: ['concat', 'es6transpiler', 'uglify','sass', 'cssmin'],
        options: {
          spawn: false,
        },
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-es6-transpiler');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'es6transpiler', 'uglify', 'sass', 'cssmin']);

};
