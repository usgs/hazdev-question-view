'use strict';

var config = require('./config');

var watch = {
  scripts: {
    files: [
      config.src + '/**/*.js',
      config.test + '/**/*.js'
    ],
    tasks: [
      'jshint:scripts',
      'browserify',
      'mocha_phantomjs'
    ]
  },
  html: {
    files: [
      config.test + '/*.html'
    ],
    tasks: [
      'copy:test'
    ]
  },
  scss: {
    files: [
      config.src + '/**/*.scss'
    ],
    tasks: [
      'postcss:dev'
    ]
  },
  reload: {
    files: [
      config.build + '/**/*',
      config.example + '/**/*'
    ],
    options: {
      livereload: config.liveReloadPort
    }
  },
  gruntfile: {
    files: [
      'Gruntfile.js',
      'gruntconfig/**/*.js'
    ],
    tasks: [
      'jshint:gruntfile'
    ]
  }
};

module.exports = watch;
