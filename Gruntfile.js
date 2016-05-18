/*
 * grunt-cloudflare-purge
 * https://github.com/ghinda/grunt-cloudflare-purge
 *
 * Copyright (c) 2016 Ionut Colceriu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var cloudflare = grunt.file.readJSON('cloudflare.json');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    cloudflare_purge: {
      default: {
        options: {
          apiKey: cloudflare.key,
          email: cloudflare.email,
          zone: cloudflare.zone
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['cloudflare_purge', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
