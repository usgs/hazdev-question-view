'use strict';

var config = require('./config');

var connect = {
  options: {
    hostname: '*'
  },
  dev: {
    options: {
      base: [
        config.build + '/' + config.test,
        config.build + '/' + config.src,
      ],
      livereload: true,
      open: 'https://localhost:8000',
      port: 8000
    }
  }
};

module.exports = connect;
