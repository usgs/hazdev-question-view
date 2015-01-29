'use strict';

var config = require('./config');

var compass = {
  dev: {
    options: {
      cssDir: config.build + '/' + config.src,
      environment: 'development',
      sassDir: config.src
    }
  },
  example: {
    options: {
      cssDir: config.build + '/example',
      environment: 'development',
      sassDir: config.example
    }
  }
};

module.exports = compass;
