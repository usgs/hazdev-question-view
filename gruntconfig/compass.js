'use strict';

var config = require('./config');

var compass = {
  src: {
    options: {
      cssDir: config.build + '/' + config.src,
      environment: 'development',
      sassDir: config.src,
      specify: [
        config.src + '/hazdev-question-view.scss'
      ]
    }
  }
};

module.exports = compass;
