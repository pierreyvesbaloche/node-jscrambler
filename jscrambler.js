'use strict';
var JScramblerClient = require('./jscrambler-client');
var Q = require('q');
/**
 * A facade to access JScrambler API using JScramblerClient.
 * @namespace jScramblerFacade
 * @author José Magalhães (magalhas@gmail.com)
 * @license MIT <http://opensource.org/licenses/MIT>
 */
exports = module.exports =
/** @lends jScramblerFacade */
{
  Client: JScramblerClient,
  /**
   * Downloads code through the API.
   * @param {JScramblerClient} client
   * @param {String} projectId
   * @param {String} [sourceId]
   * @returns {Q.promise}
   */
  downloadCode: function (client, projectId, sourceId) {
    var deferred = Q.defer();
    this
      .pollProject(client, projectId)
      .then(function () {
        var path = '/code/' + projectId;
        if (sourceId) {
          if (!/^.*\..*$/.test(sourceId))
            throw new Error('Source extension missing');
          else path += '/' + sourceId;
        } else if (!/^.*\.zip$/.test(projectId))
          path += '.zip';
        client.get(path, null, function (err, res, body) {
          if (err) deferred.reject(err);
          else if (res.statusCode >= 400) deferred.reject(res);
          else deferred.resolve(body);
        });
      });
    return deferred.promise;
  },
  /**
   * Gets projects info.
   * @param {JScramblerClient} client
   * @returns {Q.promise}
   */
  getInfo: function (client) {
    var deferred = Q.defer();
    client.get('/code.json', null, function (err, res, body) {
      if (err) deferred.reject(err);
      else if (res.statusCode >= 400) deferred.reject(res);
      else deferred.resolve(JSON.parse(body));
    });
    return deferred.promise;
  },
  /**
   * Poll project until the build finishes.
   */
  pollProject: function (client, projectId) {
    var deferred = Q.defer();
    var isFinished = function () {
      this
        .getInfo(client)
        .then(function (res) {
          for (var i = 0, l = res.length; i < l; ++i) {
            // Find projectId inside the response
            if (res[i].id === projectId) {
              // Did it finish?
              if (res[i].finished_at) {
                deferred.resolve();
                return;
              }
            }
          }
          // Try again later...
          setTimeout(isFinished, 1000);
        });
    }.bind(this);
    isFinished();
    return deferred.promise;
  },
  /**
   * Uploads code through the API.
   * @param {JScramblerClient} client
   * @param {Object} params
   * @returns {Q.promise}
   */
  uploadCode: function (client, params) {
    var deferred = Q.defer();
    client.post('/code.json', params, function (err, res, body) {
      if (err) deferred.reject(err);
      else if (res.statusCode >= 400) deferred.reject(res);
      else deferred.resolve(JSON.parse(body));
    });
    return deferred.promise;
  }
};
