'use strict';

var config = require('./config');

var cssmin = {
  dist: {
    dest: config.dist + '/hazdev-question-view.css',
    src: [config.build + '/' + config.src + '/hazdev-question-view.css']
  }
};

module.exports = cssmin;
