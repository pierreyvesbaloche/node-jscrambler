'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _mutations = require('./mutations');

var _queries = require('./queries');

var debug = !!process.env.DEBUG;

exports['default'] =
/** @lends jScramblerFacade */
{
  Client: _client2['default'],
  config: _config2['default'],
  createApplication: function createApplication(client, data, fragments) {
    var deferred = _q2['default'].defer();
    client.post('/', (0, _mutations.createApplication)(data, fragments), responseHandler(deferred));
    return deferred.promise;
  },
  getApplication: function getApplication(client, applicationId, fragments) {
    var deferred = _q2['default'].defer();
    debug && console.log('Getting info', applicationId);
    client.get('/', (0, _queries.getApplication)(applicationId, fragments), responseHandler(deferred));
    return deferred.promise;
  },
  getApplicationSource: function getApplicationSource(client, sourceId, fragments) {
    var deferred = _q2['default'].defer();
    debug && console.log('Getting info', sourceId);
    client.get('/', (0, _queries.getApplicationSource)(sourceId, fragments), responseHandler(deferred));
    return deferred.promise;
  },
  removeSourceFromApplication: function removeSourceFromApplication(client, sourceId, applicationId, fragments) {
    var deferred = _q2['default'].defer();
    debug && console.log('Getting info', sourceId);
    client.post('/', (0, _mutations.removeSourceFromApplication)(sourceId, applicationId, fragments), responseHandler(deferred));
    return deferred.promise;
  }
};

function responseHandler(deferred) {
  return function (err, res) {
    var body = res.body;
    try {
      if (err) deferred.reject(err);else if (res.statusCode >= 400) {
        if (Buffer.isBuffer(body)) {
          deferred.reject(JSON.parse(body));
        } else {
          deferred.reject(body);
        }
      } else {
        if (Buffer.isBuffer(body)) {
          deferred.resolve(JSON.parse(body));
        } else {
          deferred.resolve(body);
        }
      }
    } catch (ex) {
      deferred.reject(body);
    }
  };
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFJLENBQUMsRUFBRTtBQUN6QixrQkFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDcEMsTUFBTTtBQUNMLGtCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO09BQ0Y7S0FDRixDQUFDLE9BQU8sRUFBRSxFQUFFO0FBQ1gsY0FBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QjtHQUNGLENBQUM7Q0FDSCIsImZpbGUiOiJqc2NyYW1ibGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFEgZnJvbSAncSc7XG5pbXBvcnQgSlNjcmFtYmxlckNsaWVudCBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQXBwbGljYXRpb24sXG4gIHJlbW92ZVNvdXJjZUZyb21BcHBsaWNhdGlvblxufSBmcm9tICcuL211dGF0aW9ucyc7XG5cbmltcG9ydCB7XG4gIGdldEFwcGxpY2F0aW9uLFxuICBnZXRBcHBsaWNhdGlvblNvdXJjZVxufSBmcm9tICcuL3F1ZXJpZXMnO1xuXG5jb25zdCBkZWJ1ZyA9ICEhcHJvY2Vzcy5lbnYuREVCVUc7XG5cbmV4cG9ydCBkZWZhdWx0XG4vKiogQGxlbmRzIGpTY3JhbWJsZXJGYWNhZGUgKi9cbntcbiAgQ2xpZW50OiBKU2NyYW1ibGVyQ2xpZW50LFxuICBjb25maWc6IGNvbmZpZyxcbiAgY3JlYXRlQXBwbGljYXRpb24gKGNsaWVudCwgZGF0YSwgZnJhZ21lbnRzKSB7XG4gICAgY29uc3QgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG4gICAgY2xpZW50LnBvc3QoJy8nLCBjcmVhdGVBcHBsaWNhdGlvbihkYXRhLCBmcmFnbWVudHMpLCByZXNwb25zZUhhbmRsZXIoZGVmZXJyZWQpKTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfSxcbiAgZ2V0QXBwbGljYXRpb24gKGNsaWVudCwgYXBwbGljYXRpb25JZCwgZnJhZ21lbnRzKSB7XG4gICAgY29uc3QgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG4gICAgZGVidWcgJiYgY29uc29sZS5sb2coJ0dldHRpbmcgaW5mbycsIGFwcGxpY2F0aW9uSWQpO1xuICAgIGNsaWVudC5nZXQoJy8nLCBnZXRBcHBsaWNhdGlvbihhcHBsaWNhdGlvbklkLCBmcmFnbWVudHMpLCByZXNwb25zZUhhbmRsZXIoZGVmZXJyZWQpKTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfSxcbiAgZ2V0QXBwbGljYXRpb25Tb3VyY2UgKGNsaWVudCwgc291cmNlSWQsIGZyYWdtZW50cykge1xuICAgIGNvbnN0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgIGRlYnVnICYmIGNvbnNvbGUubG9nKCdHZXR0aW5nIGluZm8nLCBzb3VyY2VJZCk7XG4gICAgY2xpZW50LmdldCgnLycsIGdldEFwcGxpY2F0aW9uU291cmNlKHNvdXJjZUlkLCBmcmFnbWVudHMpLCByZXNwb25zZUhhbmRsZXIoZGVmZXJyZWQpKTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfSxcbiAgcmVtb3ZlU291cmNlRnJvbUFwcGxpY2F0aW9uIChjbGllbnQsIHNvdXJjZUlkLCBhcHBsaWNhdGlvbklkLCBmcmFnbWVudHMpIHtcbiAgICBjb25zdCBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICBkZWJ1ZyAmJiBjb25zb2xlLmxvZygnR2V0dGluZyBpbmZvJywgc291cmNlSWQpO1xuICAgIGNsaWVudC5wb3N0KCcvJywgcmVtb3ZlU291cmNlRnJvbUFwcGxpY2F0aW9uKHNvdXJjZUlkLCBhcHBsaWNhdGlvbklkLCBmcmFnbWVudHMpLCByZXNwb25zZUhhbmRsZXIoZGVmZXJyZWQpKTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcmVzcG9uc2VIYW5kbGVyIChkZWZlcnJlZCkge1xuICByZXR1cm4gKGVyciwgcmVzKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IHJlcy5ib2R5O1xuICAgIHRyeSB7XG4gICAgICBpZiAoZXJyKSBkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgICAgIGVsc2UgaWYgKHJlcy5zdGF0dXNDb2RlID49IDQwMCkge1xuICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KEpTT04ucGFyc2UoYm9keSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlZmVycmVkLnJlamVjdChib2R5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoSlNPTi5wYXJzZShib2R5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShib2R5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBkZWZlcnJlZC5yZWplY3QoYm9keSk7XG4gICAgfVxuICB9O1xufVxuIl19
