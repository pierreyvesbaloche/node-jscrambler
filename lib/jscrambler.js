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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qc2NyYW1ibGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2lCQUFjLEdBQUc7Ozs7c0JBQ1ksVUFBVTs7OztzQkFDcEIsVUFBVTs7Ozt5QkFDRyxhQUFhOzt1QkFDaEIsV0FBVzs7QUFFeEMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDOzs7O0FBSWxDO0FBQ0UsUUFBTSxxQkFBa0I7QUFDeEIsUUFBTSxxQkFBUTtBQUNkLG1CQUFpQixFQUFDLDJCQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQzFDLFFBQU0sUUFBUSxHQUFHLGVBQUUsS0FBSyxFQUFFLENBQUM7QUFDM0IsVUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsa0NBQWtCLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNoRixXQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7R0FDekI7QUFDRCxnQkFBYyxFQUFDLHdCQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFO0FBQ2hELFFBQU0sUUFBUSxHQUFHLGVBQUUsS0FBSyxFQUFFLENBQUM7QUFDM0IsU0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3BELFVBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLDZCQUFlLGFBQWEsRUFBRSxTQUFTLENBQUMsRUFBRSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNyRixXQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7R0FDekI7Q0FDRjs7QUFFRCxTQUFTLGVBQWUsQ0FBRSxRQUFRLEVBQUU7QUFDbEMsU0FBTyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUs7QUFDbkIsUUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztBQUN0QixRQUFJO0FBQ0YsVUFBSSxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUN6QixJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxFQUFFO0FBQzlCLFlBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN6QixrQkFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkMsTUFBTTtBQUNMLGtCQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO09BQ0YsTUFBTTtBQUNMLFlBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN6QixrQkFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDcEMsTUFBTTtBQUNMLGtCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO09BQ0Y7S0FDRixDQUFDLE9BQU8sRUFBRSxFQUFFO0FBQ1gsY0FBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QjtHQUNGLENBQUM7Q0FDSCIsImZpbGUiOiJqc2NyYW1ibGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFEgZnJvbSAncSc7XG5pbXBvcnQgSlNjcmFtYmxlckNsaWVudCBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Y3JlYXRlQXBwbGljYXRpb259IGZyb20gJy4vbXV0YXRpb25zJztcbmltcG9ydCB7Z2V0QXBwbGljYXRpb259IGZyb20gJy4vcXVlcmllcyc7XG5cbmNvbnN0IGRlYnVnID0gISFwcm9jZXNzLmVudi5ERUJVRztcblxuZXhwb3J0IGRlZmF1bHRcbi8qKiBAbGVuZHMgalNjcmFtYmxlckZhY2FkZSAqL1xue1xuICBDbGllbnQ6IEpTY3JhbWJsZXJDbGllbnQsXG4gIGNvbmZpZzogY29uZmlnLFxuICBjcmVhdGVBcHBsaWNhdGlvbiAoY2xpZW50LCBkYXRhLCBmcmFnbWVudHMpIHtcbiAgICBjb25zdCBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICBjbGllbnQucG9zdCgnLycsIGNyZWF0ZUFwcGxpY2F0aW9uKGRhdGEsIGZyYWdtZW50cyksIHJlc3BvbnNlSGFuZGxlcihkZWZlcnJlZCkpO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICB9LFxuICBnZXRBcHBsaWNhdGlvbiAoY2xpZW50LCBhcHBsaWNhdGlvbklkLCBmcmFnbWVudHMpIHtcbiAgICBjb25zdCBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICBkZWJ1ZyAmJiBjb25zb2xlLmxvZygnR2V0dGluZyBpbmZvJywgYXBwbGljYXRpb25JZCk7XG4gICAgY2xpZW50LmdldCgnLycsIGdldEFwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIGZyYWdtZW50cyksIHJlc3BvbnNlSGFuZGxlcihkZWZlcnJlZCkpO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICB9XG59O1xuXG5mdW5jdGlvbiByZXNwb25zZUhhbmRsZXIgKGRlZmVycmVkKSB7XG4gIHJldHVybiAoZXJyLCByZXMpID0+IHtcbiAgICBjb25zdCBib2R5ID0gcmVzLmJvZHk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChlcnIpIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgZWxzZSBpZiAocmVzLnN0YXR1c0NvZGUgPj0gNDAwKSB7XG4gICAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoSlNPTi5wYXJzZShib2R5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGJvZHkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShKU09OLnBhcnNlKGJvZHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGJvZHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGRlZmVycmVkLnJlamVjdChib2R5KTtcbiAgICB9XG4gIH07XG59XG4iXX0=
