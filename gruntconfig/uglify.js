'use strict';

var config = require('./config');

var uglify = {
  build: {
    files: {}
  }
};

uglify.build.files[config.dist + '/example.js'] =
    config.build + '/' + config.example + '/example.js';
uglify.build.files[config.dist + '/QuestionView.js'] =
    config.build + '/' + config.src + '/QuestionView.js';

module.exports = uglify;
