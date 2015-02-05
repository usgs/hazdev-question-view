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
  }
};

// source bundle
[
  'hazdev-question-view'
].forEach(function (bundle) {
  browserify[bundle] = {
    src: [],
    dest: config.build + '/' + config.src + '/' + bundle + '.js',
    options: {
      alias: [
        './' + config.src + '/questionview/QuestionView.js:questionview/QuestionView'
      ]
    }
  };
});

// test bundles
[
  'test'
].forEach(function (bundle) {
  browserify[bundle] = {
    src: config.test + '/' + bundle + '.js',
    dest: config.build + '/' + config.test + '/' + bundle + '.js',
    options: {
      external: [
        'questionview/QuestionView'
      ]
    }
  };
});

module.exports = browserify;
