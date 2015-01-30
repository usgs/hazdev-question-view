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

// example bundle
[
  'example'
].forEach(function (bundle) {
  browserify[bundle] = {
    src: config.example + '/' + bundle + '.js',
    dest: config.build + '/' + config.example + '/' + bundle + '.js'
  };
});

// source bundle
[
  'QuestionView'
].forEach(function (bundle) {
  browserify[bundle] = {
    src: config.src + '/' + bundle + '.js',
    dest: config.build + '/' + config.src + '/' + bundle + '.js'
  };
});

// test bundles
[
  'index',
  'QuestionViewTest'
].forEach(function (bundle) {
  browserify[bundle] = {
    src: config.test + '/' + bundle + '.js',
    dest: config.build + '/' + config.test + '/' + bundle + '.js'
  };
});

module.exports = browserify;
