'use strict';

var config = require('./config');

var copy = {
  dist: {
    expand: true,
    cwd: config.test,
    src: [
      'example.html'
    ],
    dest: config.dist
  },

  example: {
    expand: true,
    cwd: config.test,
    src: [
      'example.html'
    ],
    dest: config.build + '/' + config.example
  },

  build: {
    expand: true,
    cwd: config.test,
    src: [
      'test.html'
    ],
    dest: config.build + '/' + config.test
  }
};

module.exports = copy;
