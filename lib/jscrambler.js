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
  updateApplicationSource: function updateApplicationSource(client, applicationSource, fragments) {
    var deferred = _q2['default'].defer();
    client.post('/', (0, _mutations.updateApplicationSource)(applicationSource, fragments), responseHandler(deferred));
    return deferred.promise;
  },
  query: function query(client, queryAndVariables) {
    var deferred = _q2['default'].defer();
    client.post('/', queryAndVariables, responseHandler(deferred));
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
//# sourceMappingURL=data:application/json;base64,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QyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ25DLE1BQU07QUFDTCxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtPQUNGLE1BQU07QUFDTCxZQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDekIsa0JBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3BDLE1BQU07QUFDTCxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QjtPQUNGO0tBQ0YsQ0FBQyxPQUFPLEVBQUUsRUFBRTtBQUNYLGNBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7R0FDRixDQUFDO0NBQ0giLCJmaWxlIjoianNjcmFtYmxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBRIGZyb20gJ3EnO1xuaW1wb3J0IEpTY3JhbWJsZXJDbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUFwcGxpY2F0aW9uLFxuICB1cGRhdGVBcHBsaWNhdGlvblNvdXJjZVxufSBmcm9tICcuL211dGF0aW9ucyc7XG5cbmltcG9ydCB7XG4gIGdldEFwcGxpY2F0aW9uLFxuICBnZXRBcHBsaWNhdGlvblNvdXJjZVxufSBmcm9tICcuL3F1ZXJpZXMnO1xuXG5jb25zdCBkZWJ1ZyA9ICEhcHJvY2Vzcy5lbnYuREVCVUc7XG5cbmV4cG9ydCBkZWZhdWx0XG4vKiogQGxlbmRzIGpTY3JhbWJsZXJGYWNhZGUgKi9cbntcbiAgQ2xpZW50OiBKU2NyYW1ibGVyQ2xpZW50LFxuICBjb25maWc6IGNvbmZpZyxcbiAgY3JlYXRlQXBwbGljYXRpb24gKGNsaWVudCwgZGF0YSwgZnJhZ21lbnRzKSB7XG4gICAgY29uc3QgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG4gICAgY2xpZW50LnBvc3QoJy8nLCBjcmVhdGVBcHBsaWNhdGlvbihkYXRhLCBmcmFnbWVudHMpLCByZXNwb25zZUhhbmRsZXIoZGVmZXJyZWQpKTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfSxcbiAgZ2V0QXBwbGljYXRpb24gKGNsaWVudCwgYXBwbGljYXRpb25JZCwgZnJhZ21lbnRzKSB7XG4gICAgY29uc3QgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG4gICAgZGVidWcgJiYgY29uc29sZS5sb2coJ0dldHRpbmcgaW5mbycsIGFwcGxpY2F0aW9uSWQpO1xuICAgIGNsaWVudC5nZXQoJy8nLCBnZXRBcHBsaWNhdGlvbihhcHBsaWNhdGlvbklkLCBmcmFnbWVudHMpLCByZXNwb25zZUhhbmRsZXIoZGVmZXJyZWQpKTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfSxcbiAgZ2V0QXBwbGljYXRpb25Tb3VyY2UgKGNsaWVudCwgc291cmNlSWQsIGZyYWdtZW50cykge1xuICAgIGNvbnN0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgIGRlYnVnICYmIGNvbnNvbGUubG9nKCdHZXR0aW5nIGluZm8nLCBzb3VyY2VJZCk7XG4gICAgY2xpZW50LmdldCgnLycsIGdldEFwcGxpY2F0aW9uU291cmNlKHNvdXJjZUlkLCBmcmFnbWVudHMpLCByZXNwb25zZUhhbmRsZXIoZGVmZXJyZWQpKTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfSxcbiAgdXBkYXRlQXBwbGljYXRpb25Tb3VyY2UgKGNsaWVudCwgYXBwbGljYXRpb25Tb3VyY2UsIGZyYWdtZW50cykge1xuICAgIGNvbnN0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgIGNsaWVudC5wb3N0KCcvJywgdXBkYXRlQXBwbGljYXRpb25Tb3VyY2UoYXBwbGljYXRpb25Tb3VyY2UsIGZyYWdtZW50cyksIHJlc3BvbnNlSGFuZGxlcihkZWZlcnJlZCkpO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICB9LFxuICBxdWVyeSAoY2xpZW50LCBxdWVyeUFuZFZhcmlhYmxlcykge1xuICAgIGNvbnN0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgIGNsaWVudC5wb3N0KCcvJywgcXVlcnlBbmRWYXJpYWJsZXMsIHJlc3BvbnNlSGFuZGxlcihkZWZlcnJlZCkpO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICB9XG59O1xuXG5mdW5jdGlvbiByZXNwb25zZUhhbmRsZXIgKGRlZmVycmVkKSB7XG4gIHJldHVybiAoZXJyLCByZXMpID0+IHtcbiAgICBjb25zdCBib2R5ID0gcmVzLmJvZHk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChlcnIpIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgZWxzZSBpZiAocmVzLnN0YXR1c0NvZGUgPj0gNDAwKSB7XG4gICAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoSlNPTi5wYXJzZShib2R5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGJvZHkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShKU09OLnBhcnNlKGJvZHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGJvZHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGRlZmVycmVkLnJlamVjdChib2R5KTtcbiAgICB9XG4gIH07XG59XG4iXX0=
