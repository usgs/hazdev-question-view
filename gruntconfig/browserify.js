'use strict';

var config = require('./config');

var browserify = {
  options: {
    browserifyOptions: {
      debug: true,
      paths: [
        process.cwd() + '/' + config.src,
        process.cwd() + '/node_modules/hazdev-webutils/src'
      ]
    }
  },

  source: {
    src: [],
    dest: config.build + '/' + config.src + '/hazdev-question-view.js',
    options: {
      alias: [
        './' + config.src + '/questionview/QuestionView.js:questionview/QuestionView'
      ]
    }
  },

  test: {
    src: config.test + '/test.js',
    dest: config.build + '/' + config.test + '/test.js',
    options: {
      external: [
        'questionview/QuestionView'
      ]
    }
  }
};

module.exports = browserify;
