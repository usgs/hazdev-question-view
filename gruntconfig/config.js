'use strict';

var basePort = 8200;


var config = {
  build: '.build',
  dist: 'dist',
  distPort: basePort + 2,
  example: 'example',
  examplePort: basePort,
  liveReloadPort: basePort + 9,
  src: 'src',
  templatePort: basePort + 3,
  test: 'test',
  testPort: basePort + 1,

  cssPath: [
    './node_modules/hazdev-webutils/src'
  ],
  jsPath: [

  ]
};

module.exports = config;
