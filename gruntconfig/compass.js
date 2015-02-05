'use strict';

var config = require('./config');

var compass = {
  src: {
    options: {
      cssDir: config.build + '/' + config.src,
      environment: 'development',
      sassDir: config.src + '/questionview',
      specify: [
        config.src + '/questionview/hazdev-question-view.scss'
      ]
    }
  }
};

module.exports = compass;
