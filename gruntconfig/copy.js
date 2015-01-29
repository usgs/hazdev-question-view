'use strict';

var config = require('./config');

var copy = {
  dev: {
    src: 'src/*',
    dest: config.build + '/'
  },

  mocha: {
    expand: true,
    cwd: 'node_modules',
    src: ['mocha/mocha.js', 'mocha/mocha.css'],
    dest: config.build + '/' + config.test
  }
};

module.exports = copy;
