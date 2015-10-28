'use strict';

var autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    precss = require('precss'),
    postcssImport = require('postcss-import');

var config = require('./config'),
    CWD = '.';

var postcss = {

  dev: {
    options: {
      processors: [
        postcssImport({
          path: [
            CWD + '/' + config.src
          ].concat(config.cssPath)
        }),
        precss(),
        autoprefixer({'browsers': 'last 2 versions'})
      ]
    },
    expand: true,
    cwd: config.src,
    src: [
      '**/*.scss',
      '!**/_*.scss'
    ],
    dest: config.build + '/' + config.src,
    ext: '.css',
    extDot: 'last'
  },

  dist: {
    options: {
      processors: [
        cssnano({zindex: false}) // minify
      ]
    },
    expand: true,
    cwd: config.build + '/' + config.src,
    src: ['*.css'],
    dest: config.dist
  }

};

module.exports = postcss;
