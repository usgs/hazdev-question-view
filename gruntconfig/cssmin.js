'use strict';

var config = require('./config');

var cssmin = {
  dist: {
    files: {}
  }
};

cssmin.dist.files[config.dist + '/QuestionView.css'] = [
  config.build + '/' + config.src + '/QuestionView.css'
];

module.exports = cssmin;
