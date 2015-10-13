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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qc2NyYW1ibGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2lCQUFjLEdBQUc7Ozs7c0JBQ1ksVUFBVTs7OztzQkFDcEIsVUFBVTs7Ozt5QkFDRyxhQUFhOzt1QkFLdEMsV0FBVzs7QUFFbEIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDOzs7O0FBSWxDO0FBQ0UsUUFBTSxxQkFBa0I7QUFDeEIsUUFBTSxxQkFBUTtBQUNkLG1CQUFpQixFQUFDLDJCQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQzFDLFFBQU0sUUFBUSxHQUFHLGVBQUUsS0FBSyxFQUFFLENBQUM7QUFDM0IsVUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsa0NBQWtCLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNoRixXQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7R0FDekI7QUFDRCxnQkFBYyxFQUFDLHdCQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFO0FBQ2hELFFBQU0sUUFBUSxHQUFHLGVBQUUsS0FBSyxFQUFFLENBQUM7QUFDM0IsU0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3BELFVBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDZCQUFlLGFBQWEsRUFBRSxTQUFTLENBQUMsRUFBRSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNyRixXQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7R0FDekI7QUFDRCxzQkFBb0IsRUFBQyw4QkFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtBQUNqRCxRQUFNLFFBQVEsR0FBRyxlQUFFLEtBQUssRUFBRSxDQUFDO0FBQzNCLFNBQUssSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQyxVQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxtQ0FBcUIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLFdBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztHQUN6QjtDQUNGOztBQUVELFNBQVMsZUFBZSxDQUFFLFFBQVEsRUFBRTtBQUNsQyxTQUFPLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUNuQixRQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3RCLFFBQUk7QUFDRixVQUFJLEdBQUcsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQ3pCLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7QUFDOUIsWUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pCLGtCQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuQyxNQUFNO0FBQ0wsa0JBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7T0FDRixNQUFNO0FBQ0wsWUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pCLGtCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwQyxNQUFNO0FBQ0wsa0JBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7T0FDRjtLQUNGLENBQUMsT0FBTyxFQUFFLEVBQUU7QUFDWCxjQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0dBQ0YsQ0FBQztDQUNIIiwiZmlsZSI6ImpzY3JhbWJsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUSBmcm9tICdxJztcbmltcG9ydCBKU2NyYW1ibGVyQ2xpZW50IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtjcmVhdGVBcHBsaWNhdGlvbn0gZnJvbSAnLi9tdXRhdGlvbnMnO1xuXG5pbXBvcnQge1xuICBnZXRBcHBsaWNhdGlvbixcbiAgZ2V0QXBwbGljYXRpb25Tb3VyY2Vcbn0gZnJvbSAnLi9xdWVyaWVzJztcblxuY29uc3QgZGVidWcgPSAhIXByb2Nlc3MuZW52LkRFQlVHO1xuXG5leHBvcnQgZGVmYXVsdFxuLyoqIEBsZW5kcyBqU2NyYW1ibGVyRmFjYWRlICovXG57XG4gIENsaWVudDogSlNjcmFtYmxlckNsaWVudCxcbiAgY29uZmlnOiBjb25maWcsXG4gIGNyZWF0ZUFwcGxpY2F0aW9uIChjbGllbnQsIGRhdGEsIGZyYWdtZW50cykge1xuICAgIGNvbnN0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgIGNsaWVudC5wb3N0KCcvJywgY3JlYXRlQXBwbGljYXRpb24oZGF0YSwgZnJhZ21lbnRzKSwgcmVzcG9uc2VIYW5kbGVyKGRlZmVycmVkKSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH0sXG4gIGdldEFwcGxpY2F0aW9uIChjbGllbnQsIGFwcGxpY2F0aW9uSWQsIGZyYWdtZW50cykge1xuICAgIGNvbnN0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgIGRlYnVnICYmIGNvbnNvbGUubG9nKCdHZXR0aW5nIGluZm8nLCBhcHBsaWNhdGlvbklkKTtcbiAgICBjbGllbnQuZ2V0KCcvJywgZ2V0QXBwbGljYXRpb24oYXBwbGljYXRpb25JZCwgZnJhZ21lbnRzKSwgcmVzcG9uc2VIYW5kbGVyKGRlZmVycmVkKSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH0sXG4gIGdldEFwcGxpY2F0aW9uU291cmNlIChjbGllbnQsIHNvdXJjZUlkLCBmcmFnbWVudHMpIHtcbiAgICBjb25zdCBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICBkZWJ1ZyAmJiBjb25zb2xlLmxvZygnR2V0dGluZyBpbmZvJywgc291cmNlSWQpO1xuICAgIGNsaWVudC5nZXQoJy8nLCBnZXRBcHBsaWNhdGlvblNvdXJjZShzb3VyY2VJZCwgZnJhZ21lbnRzKSwgcmVzcG9uc2VIYW5kbGVyKGRlZmVycmVkKSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHJlc3BvbnNlSGFuZGxlciAoZGVmZXJyZWQpIHtcbiAgcmV0dXJuIChlcnIsIHJlcykgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSByZXMuYm9keTtcbiAgICB0cnkge1xuICAgICAgaWYgKGVycikgZGVmZXJyZWQucmVqZWN0KGVycik7XG4gICAgICBlbHNlIGlmIChyZXMuc3RhdHVzQ29kZSA+PSA0MDApIHtcbiAgICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuICAgICAgICAgIGRlZmVycmVkLnJlamVjdChKU09OLnBhcnNlKGJvZHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoYm9keSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKEpTT04ucGFyc2UoYm9keSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoYm9keSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgZGVmZXJyZWQucmVqZWN0KGJvZHkpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==
