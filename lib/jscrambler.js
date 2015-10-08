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
  createApplication: function createApplication(client, data) {
    var deferred = _q2['default'].defer();
    client.post('/', (0, _mutations.createApplication)(data), responseHandler(deferred));
    return deferred.promise;
  },
  getApplication: function getApplication(client, applicationId) {
    var deferred = _q2['default'].defer();
    debug && console.log('Getting info', applicationId);
    client.get('/', (0, _queries.getApplication)(applicationId), responseHandler(deferred));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qc2NyYW1ibGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2lCQUFjLEdBQUc7Ozs7c0JBQ1ksVUFBVTs7OztzQkFDcEIsVUFBVTs7Ozt5QkFDRyxhQUFhOzt1QkFDaEIsV0FBVzs7QUFFeEMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDOzs7O0FBSWxDO0FBQ0UsUUFBTSxxQkFBa0I7QUFDeEIsUUFBTSxxQkFBUTtBQUNkLG1CQUFpQixFQUFDLDJCQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDL0IsUUFBTSxRQUFRLEdBQUcsZUFBRSxLQUFLLEVBQUUsQ0FBQztBQUMzQixVQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxrQ0FBa0IsSUFBSSxDQUFDLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDckUsV0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0dBQ3pCO0FBQ0QsZ0JBQWMsRUFBQyx3QkFBQyxNQUFNLEVBQUUsYUFBYSxFQUFFO0FBQ3JDLFFBQU0sUUFBUSxHQUFHLGVBQUUsS0FBSyxFQUFFLENBQUM7QUFDM0IsU0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3BELFVBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDZCQUFlLGFBQWEsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzFFLFdBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztHQUN6QjtDQUNGOztBQUVELFNBQVMsZUFBZSxDQUFFLFFBQVEsRUFBRTtBQUNsQyxTQUFPLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUNuQixRQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3RCLFFBQUk7QUFDRixVQUFJLEdBQUcsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQ3pCLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7QUFDOUIsWUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pCLGtCQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuQyxNQUFNO0FBQ0wsa0JBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7T0FDRixNQUFNO0FBQ0wsWUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pCLGtCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwQyxNQUFNO0FBQ0wsa0JBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7T0FDRjtLQUNGLENBQUMsT0FBTyxFQUFFLEVBQUU7QUFDWCxjQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0dBQ0YsQ0FBQztDQUNIIiwiZmlsZSI6ImpzY3JhbWJsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUSBmcm9tICdxJztcbmltcG9ydCBKU2NyYW1ibGVyQ2xpZW50IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtjcmVhdGVBcHBsaWNhdGlvbn0gZnJvbSAnLi9tdXRhdGlvbnMnO1xuaW1wb3J0IHtnZXRBcHBsaWNhdGlvbn0gZnJvbSAnLi9xdWVyaWVzJztcblxuY29uc3QgZGVidWcgPSAhIXByb2Nlc3MuZW52LkRFQlVHO1xuXG5leHBvcnQgZGVmYXVsdFxuLyoqIEBsZW5kcyBqU2NyYW1ibGVyRmFjYWRlICovXG57XG4gIENsaWVudDogSlNjcmFtYmxlckNsaWVudCxcbiAgY29uZmlnOiBjb25maWcsXG4gIGNyZWF0ZUFwcGxpY2F0aW9uIChjbGllbnQsIGRhdGEpIHtcbiAgICBjb25zdCBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICBjbGllbnQucG9zdCgnLycsIGNyZWF0ZUFwcGxpY2F0aW9uKGRhdGEpLCByZXNwb25zZUhhbmRsZXIoZGVmZXJyZWQpKTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfSxcbiAgZ2V0QXBwbGljYXRpb24gKGNsaWVudCwgYXBwbGljYXRpb25JZCkge1xuICAgIGNvbnN0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgIGRlYnVnICYmIGNvbnNvbGUubG9nKCdHZXR0aW5nIGluZm8nLCBhcHBsaWNhdGlvbklkKTtcbiAgICBjbGllbnQuZ2V0KCcvJywgZ2V0QXBwbGljYXRpb24oYXBwbGljYXRpb25JZCksIHJlc3BvbnNlSGFuZGxlcihkZWZlcnJlZCkpO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICB9XG59O1xuXG5mdW5jdGlvbiByZXNwb25zZUhhbmRsZXIgKGRlZmVycmVkKSB7XG4gIHJldHVybiAoZXJyLCByZXMpID0+IHtcbiAgICBjb25zdCBib2R5ID0gcmVzLmJvZHk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChlcnIpIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgZWxzZSBpZiAocmVzLnN0YXR1c0NvZGUgPj0gNDAwKSB7XG4gICAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoSlNPTi5wYXJzZShib2R5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGJvZHkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShKU09OLnBhcnNlKGJvZHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGJvZHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGRlZmVycmVkLnJlamVjdChib2R5KTtcbiAgICB9XG4gIH07XG59XG4iXX0=
