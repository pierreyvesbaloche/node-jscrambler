'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashClone = require('lodash.clone');

var _lodashClone2 = _interopRequireDefault(_lodashClone);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _lodashDefaults = require('lodash.defaults');

var _lodashDefaults2 = _interopRequireDefault(_lodashDefaults);

//import fs from 'fs';

var _lodashKeys = require('lodash.keys');

var _lodashKeys2 = _interopRequireDefault(_lodashKeys);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var debug = !!process.env.DEBUG;

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
function JScramblerClient(options) {
  // Sluggish hack for backwards compatibility
  if (options && !options.keys && (options.accessKey || options.secretKey)) {
    options.keys = {};
    options.keys.accessKey = options.accessKey;
    options.keys.secretKey = options.secretKey;
  }

  options.keys = (0, _lodashDefaults2['default'])(options.keys || {}, _config2['default'].keys);
  /**
   * @member
   */
  this.options = (0, _lodashDefaults2['default'])(options || {}, _config2['default']);
  if (!this.options.keys.accessKey || !this.options.keys.secretKey) throw new Error('Missing access or secret keys');
}
/**
 * It builds a query string sorted by key.
 * @private
 * @static
 * @param {Object} params
 * @memberof JScramblerClient
 * @returns {String} The query string.
 */
function buildSortedQuery(params) {
  // Sorted keys
  var _keys = (0, _lodashKeys2['default'])(params).sort();
  var query = '';
  for (var i = 0, l = _keys.length; i < l; i++) query += encodeURIComponent(_keys[i]) + '=' + encodeURIComponent(params[_keys[i]]) + '&';
  query = query.replace(/\*/g, '%2A').replace(/[!'()]/g, escape).replace(/%7E/g, '~').replace(/\+/g, '%20');
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
function generateHmacSignature(method, path, params) {
  var paramsCopy = (0, _lodashClone2['default'])(params);
  for (var key in params) {
    if (key.indexOf('file_') !== -1) {
      paramsCopy[key] = _crypto2['default'].createHash('md5').update(fs.readFileSync(params[key].file)).digest('hex');
    }
  }
  var signatureData = method.toUpperCase() + ';' + this.options.host.toLowerCase() + ';' + path + ';' + buildSortedQuery(paramsCopy);
  debug && console.log('Signature data: ' + signatureData);
  var hmac = _crypto2['default'].createHmac('sha256', this.options.keys.secretKey.toUpperCase());
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
function handleFileParams(params) {
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
function signedParams(method, path, params) {
  params = (0, _lodashDefaults2['default'])((0, _lodashClone2['default'])(params), {
    access_key: this.options.keys.accessKey,
    timestamp: new Date().toISOString(),
    user_agent: 'Node'
  });
  if (method === 'POST' && params.files) handleFileParams(params);
  params.signature = generateHmacSignature.call(this, method, path, params);
  return params;
}
/**
 * Delete request.
 * @param {String} path
 * @param {Object} params
 * @param {Callback} callback
 */
JScramblerClient.prototype['delete'] = function (path, params, callback) {
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
JScramblerClient.prototype.request = function (method, path) {
  var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  var signedData;

  var _keys = (0, _lodashKeys2['default'])(params);
  for (var i = 0, l = _keys.length; i < l; i++) {
    if (params[_keys[i]] instanceof Array && _keys[i] !== 'files') {
      params[_keys[i]] = params[_keys[i]].join(',');
    }
  }

  // If post sign data and set the request as multipart
  signedData = signedParams.apply(this, arguments);

  // Format URL
  var protocol = this.options.port === 443 ? 'https' : 'http';

  var formatedUrl = _url2['default'].format({
    hostname: this.options.host,
    port: this.options.port,
    protocol: protocol
  }) + path;

  var req = _superagent2['default'][method.toLowerCase()](formatedUrl).type('json');

  if (method === 'POST' || method === 'PUT') {
    req.send(signedData);
  } else {
    req.query(signedData);
  }

  req.end(callback);
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
//# sourceMappingURL=data:application/json;base64,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QUUsUUFBUSxFQUFFO0FBQ2xFLE1BQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDOUMsQ0FBQzs7QUFFRixPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2xvbmUgZnJvbSAnbG9kYXNoLmNsb25lJztcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICdsb2Rhc2guZGVmYXVsdHMnO1xuLy9pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGtleXMgZnJvbSAnbG9kYXNoLmtleXMnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnc3VwZXJhZ2VudCc7XG5pbXBvcnQgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgY2ZnIGZyb20gJy4vY29uZmlnJztcblxuY29uc3QgZGVidWcgPSAhIXByb2Nlc3MuZW52LkRFQlVHO1xuXG4vKipcbiAqIEBjbGFzcyBKU2NyYW1ibGVyQ2xpZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuYWNjZXNzS2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5zZWNyZXRLZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5ob3N0PWFwaS5qc2NyYW1ibGVyLmNvbV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5wb3J0PTQ0M11cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5hcGlWZXJzaW9uPTNdXG4gKiBAYXV0aG9yIEpvc8OpIE1hZ2FsaMOjZXMgKG1hZ2FsaGFzQGdtYWlsLmNvbSlcbiAqIEBsaWNlbnNlIE1JVCA8aHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cbiAqL1xuZnVuY3Rpb24gSlNjcmFtYmxlckNsaWVudCAob3B0aW9ucykge1xuICAvLyBTbHVnZ2lzaCBoYWNrIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICBpZiAob3B0aW9ucyAmJiAhb3B0aW9ucy5rZXlzICYmIChvcHRpb25zLmFjY2Vzc0tleSB8fCBvcHRpb25zLnNlY3JldEtleSkpIHtcbiAgICBvcHRpb25zLmtleXMgPSB7fTtcbiAgICBvcHRpb25zLmtleXMuYWNjZXNzS2V5ID0gb3B0aW9ucy5hY2Nlc3NLZXk7XG4gICAgb3B0aW9ucy5rZXlzLnNlY3JldEtleSA9IG9wdGlvbnMuc2VjcmV0S2V5O1xuICB9XG5cbiAgb3B0aW9ucy5rZXlzID0gZGVmYXVsdHMob3B0aW9ucy5rZXlzIHx8IHt9LCBjZmcua2V5cyk7XG4gIC8qKlxuICAgKiBAbWVtYmVyXG4gICAqL1xuICB0aGlzLm9wdGlvbnMgPSBkZWZhdWx0cyhvcHRpb25zIHx8IHt9LCBjZmcpO1xuICBpZiAoIXRoaXMub3B0aW9ucy5rZXlzLmFjY2Vzc0tleSB8fCAhdGhpcy5vcHRpb25zLmtleXMuc2VjcmV0S2V5KVxuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBhY2Nlc3Mgb3Igc2VjcmV0IGtleXMnKTtcbn1cbi8qKlxuICogSXQgYnVpbGRzIGEgcXVlcnkgc3RyaW5nIHNvcnRlZCBieSBrZXkuXG4gKiBAcHJpdmF0ZVxuICogQHN0YXRpY1xuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICogQG1lbWJlcm9mIEpTY3JhbWJsZXJDbGllbnRcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkU29ydGVkUXVlcnkgKHBhcmFtcykge1xuICAvLyBTb3J0ZWQga2V5c1xuICB2YXIgX2tleXMgPSBrZXlzKHBhcmFtcykuc29ydCgpO1xuICB2YXIgcXVlcnkgPSAnJztcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBfa2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgcXVlcnkgKz0gZW5jb2RlVVJJQ29tcG9uZW50KF9rZXlzW2ldKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNbX2tleXNbaV1dKSArICcmJztcbiAgcXVlcnkgPSBxdWVyeVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bIScoKV0vZywgZXNjYXBlKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyU3RS9nLCAnficpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwrL2csICclMjAnKTtcbiAgLy8gU3RyaXAgdGhlIGxhc3Qgc2VwYXJhdG9yIGFuZCByZXR1cm5cbiAgcmV0dXJuIHF1ZXJ5LnN1YnN0cmluZygwLCBxdWVyeS5sZW5ndGggLSAxKTtcbn1cbi8qKlxuICogR2VuZXJhdGVzIHRoZSBuZWVkZWQgSE1BQyBzaWduYXR1cmUgZm9yIHRoZSByZXF1ZXN0LlxuICogQG1lbWJlcm9mIEpTY3JhbWJsZXJDbGllbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZGlnZXN0ZWQgc2lnbmF0dXJlLlxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUhtYWNTaWduYXR1cmUgKG1ldGhvZCwgcGF0aCwgcGFyYW1zKSB7XG4gIHZhciBwYXJhbXNDb3B5ID0gY2xvbmUocGFyYW1zKTtcbiAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgIGlmIChrZXkuaW5kZXhPZignZmlsZV8nKSAhPT0gLTEpIHtcbiAgICAgIHBhcmFtc0NvcHlba2V5XSA9IGNyeXB0by5jcmVhdGVIYXNoKCdtZDUnKS51cGRhdGUoXG4gICAgICAgIGZzLnJlYWRGaWxlU3luYyhwYXJhbXNba2V5XS5maWxlKSkuZGlnZXN0KCdoZXgnKTtcbiAgICB9XG4gIH1cbiAgdmFyIHNpZ25hdHVyZURhdGEgPSBtZXRob2QudG9VcHBlckNhc2UoKSArICc7JyArIHRoaXMub3B0aW9ucy5ob3N0LnRvTG93ZXJDYXNlKCkgK1xuICAgICc7JyArIHBhdGggKyAnOycgKyBidWlsZFNvcnRlZFF1ZXJ5KHBhcmFtc0NvcHkpO1xuICBkZWJ1ZyAmJiBjb25zb2xlLmxvZygnU2lnbmF0dXJlIGRhdGE6ICcgKyBzaWduYXR1cmVEYXRhKTtcbiAgdmFyIGhtYWMgPSBjcnlwdG8uY3JlYXRlSG1hYygnc2hhMjU2JywgdGhpcy5vcHRpb25zLmtleXMuc2VjcmV0S2V5LnRvVXBwZXJDYXNlKCkpO1xuICBobWFjLnVwZGF0ZShzaWduYXR1cmVEYXRhKTtcbiAgcmV0dXJuIGhtYWMuZGlnZXN0KCdiYXNlNjQnKTtcbn1cbi8qKlxuICogSXRlcmF0ZSBlYWNoIHBhc3NlZCBmaWxlIGluc2lkZSBwYXJhbXMuZmlsZXMgYW5kIGNyZWF0ZXMgdGhlIGNvcnJlc3BvbmRpbmdcbiBwYXJhbXMuZmlsZV97aW5kZXh9LiBJdCBkZWxldGVzIHBhcmFtcy5maWxlcyBhZnRlciBpdGVyYXRpbmcuXG4gKiBAcHJpdmF0ZVxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIEpTY3JhbWJsZXJDbGllbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUZpbGVQYXJhbXMgKHBhcmFtcykge1xuICBpZiAocGFyYW1zLmZpbGVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYXJhbXMuZmlsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBwYXJhbXNbJ2ZpbGVfJyArIGldID0ge1xuICAgICAgICBmaWxlOiBwYXJhbXMuZmlsZXNbaV0sXG4gICAgICAgIGNvbnRlbnRfdHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSdcbiAgICAgIH07XG4gICAgfVxuICAgIGRlbGV0ZSBwYXJhbXMuZmlsZXM7XG4gIH1cbn1cbi8qKlxuICogU2lnbnMgYWxsIHRoZSBwYXJhbWV0ZXJzLlxuIF4gQHByaXZhdGVcbiAqIEBtZW1iZXJvZiBKU2NyYW1ibGVyQ2xpZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICogQHJldHVybnMge09iamVjdH0gUGFyYW1zIGNvbnRhaW5pbmcgdGhlIGFjY2Vzc19rZXksIHRpbWVzdGFtcCBhbmQgc2lnbmF0dXJlXG4gcHJvcGVydGllcy5cbiAqL1xuZnVuY3Rpb24gc2lnbmVkUGFyYW1zIChtZXRob2QsIHBhdGgsIHBhcmFtcykge1xuICBwYXJhbXMgPSBkZWZhdWx0cyhjbG9uZShwYXJhbXMpLCB7XG4gICAgYWNjZXNzX2tleTogdGhpcy5vcHRpb25zLmtleXMuYWNjZXNzS2V5LFxuICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgIHVzZXJfYWdlbnQ6ICdOb2RlJ1xuICB9KTtcbiAgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnICYmIHBhcmFtcy5maWxlcykgaGFuZGxlRmlsZVBhcmFtcyhwYXJhbXMpO1xuICBwYXJhbXMuc2lnbmF0dXJlID0gZ2VuZXJhdGVIbWFjU2lnbmF0dXJlLmNhbGwodGhpcywgbWV0aG9kLCBwYXRoLCBwYXJhbXMpO1xuICByZXR1cm4gcGFyYW1zO1xufVxuLyoqXG4gKiBEZWxldGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICovXG5KU2NyYW1ibGVyQ2xpZW50LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAocGF0aCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICB0aGlzLnJlcXVlc3QoJ0RFTEVURScsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2spO1xufTtcbi8qKlxuICogR2V0IHJlcXVlc3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICogQHBhcmFtIHtDYWxsYmFja30gY2FsbGJhY2tcbiAqL1xuSlNjcmFtYmxlckNsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgdGhpcy5yZXF1ZXN0KCdHRVQnLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrKTtcbn07XG4vKipcbiAqIEhUVFAgcmVxdWVzdC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gKiBAcGFyYW0ge0NhbGxiYWNrfSBjYWxsYmFja1xuICovXG5KU2NyYW1ibGVyQ2xpZW50LnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgcGF0aCwgcGFyYW1zID0ge30sIGNhbGxiYWNrID0gbnVsbCkge1xuICB2YXIgc2lnbmVkRGF0YTtcblxuICB2YXIgX2tleXMgPSBrZXlzKHBhcmFtcyk7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gX2tleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYocGFyYW1zW19rZXlzW2ldXSBpbnN0YW5jZW9mIEFycmF5ICYmIF9rZXlzW2ldICE9PSAnZmlsZXMnKSB7XG4gICAgICBwYXJhbXNbX2tleXNbaV1dID0gcGFyYW1zW19rZXlzW2ldXS5qb2luKCcsJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgcG9zdCBzaWduIGRhdGEgYW5kIHNldCB0aGUgcmVxdWVzdCBhcyBtdWx0aXBhcnRcbiAgc2lnbmVkRGF0YSA9IHNpZ25lZFBhcmFtcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gIC8vIEZvcm1hdCBVUkxcbiAgdmFyIHByb3RvY29sID0gdGhpcy5vcHRpb25zLnBvcnQgPT09IDQ0MyA/ICdodHRwcycgOiAnaHR0cCc7XG5cbiAgdmFyIGZvcm1hdGVkVXJsID0gdXJsLmZvcm1hdCh7XG4gICAgaG9zdG5hbWU6IHRoaXMub3B0aW9ucy5ob3N0LFxuICAgIHBvcnQ6IHRoaXMub3B0aW9ucy5wb3J0LFxuICAgIHByb3RvY29sOiBwcm90b2NvbFxuICB9KSArIHBhdGg7XG5cbiAgY29uc3QgcmVxID0gcmVxdWVzdFttZXRob2QudG9Mb3dlckNhc2UoKV0oZm9ybWF0ZWRVcmwpLnR5cGUoJ2pzb24nKTtcblxuICBpZiAobWV0aG9kID09PSAnUE9TVCcgfHwgbWV0aG9kID09PSAnUFVUJykge1xuICAgIHJlcS5zZW5kKHNpZ25lZERhdGEpO1xuICB9IGVsc2Uge1xuICAgIHJlcS5xdWVyeShzaWduZWREYXRhKTtcbiAgfVxuXG4gIHJlcS5lbmQoY2FsbGJhY2spO1xufTtcbi8qKlxuICogUG9zdCByZXF1ZXN0LlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAqIEBwYXJhbSB7Q2FsbGJhY2t9IGNhbGxiYWNrXG4gKi9cbkpTY3JhbWJsZXJDbGllbnQucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAocGF0aCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IEpTY3JhbWJsZXJDbGllbnQ7XG4iXX0=
