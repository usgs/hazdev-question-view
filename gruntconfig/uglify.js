'use strict';

var config = require('./config');

var uglify = {
  dist: {
    src: config.build + '/' + config.src + '/hazdev-question-view.js',
    dest: config.dist + '/hazdev-question-view.js'
  }
};

module.exports = uglify;
