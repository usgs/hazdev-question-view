'use strict';

// PhantomJS is missing native bind support,
//     https://github.com/ariya/phantomjs/issues/10522
// Polyfill from:
//     https://developer.mozilla.org
//         /en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5 internal IsCallable
      throw new TypeError('object to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        NOP = function () {},
        fBound;

    fBound = function () {
      return fToBind.apply(
          (this instanceof NOP && oThis ? this : oThis),
          aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    NOP.prototype = this.prototype;
    fBound.prototype = new NOP();

    return fBound;
  };
}

var config = {
  chai: require('chai/chai'),
  connect: require('../gruntconfig/connect'),
  jshint: require('../gruntconfig/jshint'),
  mocha_phantomjs: require('../gruntconfig/mocha_phantomjs'),
  mvc: require('mvc'),
  sinon: require('sinon/pkg/sinon'),
  util: require('util'),
  watch: require('../gruntconfig/watch'),

  tasks: [
    'grunt-contrib-connect',
    'grunt-contrib-jshint',
    'grunt-mocha-phantomjs',
    'grunt-contrib-watch'
  ]
};


require([
  'mocha',
], function (
  mocha
) {
  'use strict';

  mocha.setup('bdd');

  // Add each test class here as they are implemented
  require([
    'spec/QuestionViewTest'
  ], function () {
    if (window.mochaPhantomJS) {
      window.mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });
});

module.exports = config;
