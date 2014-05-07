/**
 * A facade to access JScrambler API using JScramblerClient.
 * @namespace jScramblerFacade
 * @author José Magalhães (magalhas@gmail.com)
 * @license MIT <http://opensource.org/licenses/MIT>
 */
'use strict';

var fs = require('fs-extra');
var JScramblerClient = require('./jscrambler-client');
var JSZip = require('jszip');
var path = require('path');
var Q = require('q');

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
          else if (res.statusCode >= 400) deferred.reject(JSON.parse(body));
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
      else if (res.statusCode >= 400) deferred.reject(JSON.parse(body));
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
    this.zipProject(params.files);
    client.post('/code.json', params, function (err, res, body) {
      this.cleanZipProject();
      if (err) deferred.reject(err);
      else if (res.statusCode >= 400) deferred.reject(JSON.parse(body));
      else deferred.resolve(JSON.parse(body));
    }.bind(this));
    return deferred.promise;
  },
  /**
   * Deletes code through the API.
   * @param {JScramblerClient} client
   * @param {String} projectId
   * @returns {Q.promise}
   */
  deleteCode: function (client, projectId) {
    var deferred = Q.defer();
    client.delete('/code/' + projectId + '.zip', null, function (err, res, body) {
      if (err) deferred.reject(err);
      else if (res.statusCode >= 400) deferred.reject(JSON.parse(body));
      else deferred.resolve(JSON.parse(body));
    });
    return deferred.promise;
  },
  /**
   * It cleans the temporary zip project.
   */
  cleanZipProject: function () {
    fs.unlinkSync('.tmp.zip');
  },
  /**
   * It zips all files inside the passed parameter into a single zip file.
   */
  zipProject: function (files) {
    var zip = new JSZip();
    for (var i = 0, l = files.length; i < l; ++i) {
      var buffer, name;
      if (files[i].contents) {
        name = path.relative(files[i].cwd, files[i].path);
        buffer = files[i].contents;
      } else {
        name = files[i];
        buffer = fs.readFileSync(files[i]);
      }
      zip.file(name, buffer);
    }
    fs.outputFileSync('.tmp.zip', zip.generate(), {encoding: 'base64'});
    files[0] = '.tmp.zip';
    files.length = 1;
  },
  /**
   * It unzips a zip file to the given destination.
   */
  unzipProject: function (zipFile, dest) {
    var zip = new JSZip(zipFile);
    for (var file in zip.files) {
      if (!zip.files[file].options.dir) {
        var buffer = zip.file(file).asNodeBuffer();
        if (typeof dest === 'function') {
          dest(buffer, file);
        } else if (dest) {
          fs.outputFileSync(path.join(dest, file), buffer);
        }
      }
    }
  }
};
