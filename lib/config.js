'use strict';

var rc = require('rc');

// Load RC configuration if present
var cfg = rc('jscrambler', {
  keys: {},
  host: 'api.jscrambler.com',
  port: 443,
  apiVersion: 3
});

module.exports = cfg;
