'use strict';

var config = {
  browserify: require('./browserify'),
  compass: require('./compass'),
  connect: require('./connect'),
  copy: require('./copy'),
  jshint: require('./jshint'),
  watch: require('./watch'),
  mocha_phantomjs: require('./mocha_phantomjs'),

  tasks: [
    'grunt-browserify',
    'grunt-contrib-clean',
    'grunt-contrib-compass',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-jshint',
    'grunt-contrib-watch'
    'grunt-mocha-phantomjs'
  ]
};

module.exports = config;
