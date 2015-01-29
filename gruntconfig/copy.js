'use strict';

var config = require('./config');

var copy = {
  dev: {
    files: [
      {
        src: [
          'node_modules/mocha/*.js',
          'node_modules/mocha/*.css'
        ],
        dest: config.build + '/' + config.test + '/'
      },
      {
        src: 'src/*',
        dest: config.build + '/'
      }
    ]
  }
};

module.exports = copy;
