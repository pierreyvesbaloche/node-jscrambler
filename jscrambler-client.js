'use strict';

var cfg = require('./lib/config');
var clone = require('lodash.clone');
var crypto = require('crypto');
var defaults = require('lodash.defaults');
var fs = require('fs');
var keys = require('lodash.keys');
var needle = require('needle');
var querystring = require('querystring');
var url = require('url');

/**
 * @class JScramblerClient
 * @param {Object} options
 * @param {String} options.accessKey
 * @param {String} options.secretKey
 * @param {String} [options.host=api.jscrambler.com]
 * @param {String} [options.port=443]
 * @param {String} [options.apiVersion=3]
 * @author José Magalhães (magalhas@gmail.com)
 * @license MIT <http://opensource.org/licenses/MIT>
 */
function JScramblerClient (options) {
  // Sluggish hack for backwards compatibility
  if (options && !options.keys && (options.accessKey || options.secretKey)) {
    options.keys = {};
    options.keys.accessKey = options.accessKey;
    options.keys.secretKey = options.secretKey;
  }

  options.keys = defaults(options.keys || {}, cfg.keys);
  /**
   * @member
   */
  this.options = defaults(options || {}, cfg);
  if (!this.options.keys.accessKey || !this.options.keys.secretKey)
    throw new Error('Missing access or secret keys');
}
/**
 * Builds the request URL. In case of being a POST it doesn't append data to
 the query string.
 * @private
 * @memberof JScramblerClient
 * @param {String} method
 * @param {String} path
 * @param {Object} params
 * @returns {String} The request path.
 */
function buildPath (method, path, params) {
  var query = '';
  if (method !== 'POST') {
    query = '?' + querystring.stringify(signedParams.apply(this, arguments));
  }
  return '/v' + this.options.apiVersion + path + query;
}
/**
 * It builds a query string sorted by key.
 * @private
 * @static
 * @param {Object} params
 * @memberof JScramblerClient
 * @returns {String} The query string.
 */
function buildSortedQuery (params) {
  // Sorted keys
  var _keys = keys(params).sort();
  var query = '';
  for (var i = 0, l = _keys.length; i < l; i++)
    query += encodeURIComponent(_keys[i]) + '=' + encodeURIComponent(params[_keys[i]]) + '&';
  query = query
            .replace(/\*/g, '%2A')
            .replace(/[!'()]/g, escape)
            .replace(/%7E/g, '~')
            .replace(/\+/g, '%20');
  // Strip the last separator and return
  return query.substring(0, query.length - 1);
}
/**
 * Generates the needed HMAC signature for the request.
 * @memberof JScramblerClient
 * @param {String} method
 * @param {String} path
 * @param {Object} params
 * @returns {String} The digested signature.
 */
function generateHmacSignature (method, path, params) {
  var paramsCopy = clone(params);
  for (var key in params) {
    if (key.indexOf('file_') !== -1) {
      paramsCopy[key] = crypto.createHash('md5').update(
        fs.readFileSync(params[key].file)).digest('hex');
    }
  }
  var signatureData = method.toUpperCase() + ';' + this.options.host.toLowerCase() +
    ';' + path + ';' + buildSortedQuery(paramsCopy);
  var hmac = crypto.createHmac('sha256', this.options.keys.secretKey.toUpperCase());
  hmac.update(signatureData);
  return hmac.digest('base64');
}
/**
 * Iterate each passed file inside params.files and creates the corresponding
 params.file_{index}. It deletes params.files after iterating.
 * @private
 * @static
 * @memberof JScramblerClient
 * @param {String} method
 * @param {String} path
 * @param {Object} params
 */
function handleFileParams (params) {
  if (params.files) {
    for (var i = 0, l = params.files.length; i < l; i++) {
      params['file_' + i] = {
        file: params.files[i],
        content_type: 'application/octet-stream'
      };
    }
    delete params.files;
  }
}
/**
 * Signs all the parameters.
 ^ @private
 * @memberof JScramblerClient
 * @param {String} method
 * @param {String} path
 * @param {Object} params
 * @returns {Object} Params containing the access_key, timestamp and signature
 properties.
 */
function signedParams (method, path, params) {
  defaults(params, {
    access_key: this.options.keys.accessKey,
    timestamp: new Date().toISOString(),
    user_agent: 'Node'
  });
  if (method === 'POST' && params.files) handleFileParams(params);
  params.signature = generateHmacSignature.apply(this, arguments);
  return params;
}
/**
 * Delete request.
 * @param {String} path
 * @param {Object} params
 * @param {Callback} callback
 */
JScramblerClient.prototype.delete = function (path, params, callback) {
  this.request('DELETE', path, params, callback);
};
/**
 * Get request.
 * @param {String} path
 * @param {Object} params
 * @param {Callback} callback
 */
JScramblerClient.prototype.get = function (path, params, callback) {
  this.request('GET', path, params, callback);
};
/**
 * HTTP request.
 * @param {String} method
 * @param {String} path
 * @param {Object} params
 * @param {Callback} callback
 */
JScramblerClient.prototype.request = function (method, path, params, callback) {
  var signedData;
  var options = {timeout: 0};
  if (!params) params = {};
  // If post sign data and set the request as multipart
  if (method === 'POST') {
    signedData = signedParams.apply(this, arguments);
    options.multipart = true;
  }
  // Format URL
  var protocol = this.options.port === 443 ? 'https' : 'http';
  var formatedUrl = url.format({
    hostname: this.options.host,
    port: this.options.port,
    protocol: protocol
  }) + buildPath.call(this, method, path, params);
  needle.request(method, formatedUrl, signedData || params, options, callback);
};
/**
 * Post request.
 * @param {String} path
 * @param {Object} params
 * @param {Callback} callback
 */
JScramblerClient.prototype.post = function (path, params, callback) {
  this.request('POST', path, params, callback);
};

exports = module.exports = JScramblerClient;
