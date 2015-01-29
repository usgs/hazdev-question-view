'use strict';

var config = require('./config');

var compass = {
  dev: {
    options: {
      sassDir: config.src,
      cssDir: config.build,
      environment: 'development'
    }
  }
};

module.exports = compass;
