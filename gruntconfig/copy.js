'use strict';

var config = require('./config');

var copy = {
  example: {
    expand: true,
    cwd: config.test,
    src: [
      'example.html'
    ],
    dest: config.build + '/' + config.example
  },

  test: {
    expand: true,
    cwd: config.test,
    src: [
      'index.html'
    ],
    dest: config.build + '/' + config.test
  },

  mocha: {
    expand: true,
    cwd: 'node_modules',
    src: [
      'mocha/mocha.js',
      'mocha/mocha.css'
    ],
    dest: config.build + '/' + config.test
  }
};

module.exports = copy;
