'use strict';

var rc = require('rc');

// Load RC configuration if present. Pass `[]` as last argument to avoid
// getting variables from `argv`.
var config = rc('jscrambler', {
  keys: {},
  host: 'api.jscrambler.com',
  port: 443,
  apiVersion: 3
}, []);

module.exports = config;
