/**
 * A facade to access JScrambler API using JScramblerClient.
 * @namespace jScramblerFacade
 * @author José Magalhães (magalhas@gmail.com)
 * @license MIT <http://opensource.org/licenses/MIT>
 */
'use strict';

var _ = require('lodash');
var fs = require('fs-extra');
var glob = require('glob');
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
          try {
            if (err) deferred.reject(err);
            else if (res.statusCode >= 400) deferred.reject(JSON.parse(body));
            else deferred.resolve(body);
          } catch (ex) {
            deferred.reject(body);
          }
        });
      })
      .fail(function () {
        deferred.reject.apply(null, arguments);
      });
    return deferred.promise;
  },
  /**
   * Gets projects info.
   * @param {JScramblerClient} client
   * @returns {Q.promise}
   */
  getInfo: function (client, projectId) {
    var deferred = Q.defer();
    var path = projectId ? '/code/' + projectId + '.json' : '/code.json';
    client.get(path, null, function (err, res, body) {
      try {
        if (err) deferred.reject(err);
        else if (res.statusCode >= 400) deferred.reject(JSON.parse(body));
        else deferred.resolve(JSON.parse(body));
      } catch (ex) {
        deferred.reject(body);
      }
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
        .getInfo(client, projectId)
        .then(function (res) {
          // Did it finish?
          if (res.finished_at) {
            if (res.error_id && res.error_id !== '0') {
              deferred.reject(res);
            } else {
              deferred.resolve();
            }
            return;
          }
          // Try again later...
          setTimeout(isFinished, 1000);
        })
        .fail(function () {
          deferred.reject.apply(null, arguments);
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
    this.zipProject(params.files, params.cwd);
    delete params.cwd;
    client.post('/code.json', params, function (err, res, body) {
      this.cleanZipProject();
      try {
        if (err) deferred.reject(err);
        else if (res.statusCode >= 400) deferred.reject(JSON.parse(body));
        else deferred.resolve(JSON.parse(body));
      } catch (ex) {
        deferred.reject(body);
      }
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
      try {
        if (err) deferred.reject(err);
        else if (res.statusCode >= 400) deferred.reject(JSON.parse(body));
        else deferred.resolve(JSON.parse(body));
      } catch (ex) {
        deferred.reject(body);
      }
    });
    return deferred.promise;
  },
  /**
   * Common operation sequence intended when using the client. First it
   * uploads a project, then it polls the server to download and unzip the
   * project into a folder.
   * @param {String|Object} configPathOrObject
   * @returns {Q.promise}
   */
  process: function (configPathOrObject, destCallback) {
    var config = typeof configPathOrObject === 'string' ?
          require(configPathOrObject) : configPathOrObject;
    if (!config.keys || !config.keys.accessKey || !config.keys.secretKey) {
      throw new Exception('Access key and secret key must be provided in the configuration file.');
    }
    var accessKey = config.keys.accessKey;
    var secretKey = config.keys.secretKey;
    var host = config.host;
    var port = config.port;
    var apiVersion = config.apiVersion;
    // Instance a JScrambler client
    var client = new this.Client({
      accessKey: accessKey,
      secretKey: secretKey,
      host: host,
      port: port,
      apiVersion: apiVersion
    });
    // Check for source files and add them to the parameters
    if (!config.filesSrc) {
      throw new Exception('Source files must be provided.');
    }
    // Check if output directory was provided
    if (!config.filesDest && !destCallback) {
      throw new Exception('Output directory must be provided.');
    }
    var filesSrc = [];
    for (var i = 0, l = config.filesSrc.length; i < l; ++i) {
      if (typeof config.filesSrc[i] === 'string') {
        filesSrc = filesSrc.concat(glob.sync(config.filesSrc[i], {dot: true}));
      } else {
        filesSrc.push(config.filesSrc[i]);
      }
    }
    // Prepare object to post
    var params = config.params || {};
    params.files = filesSrc;
    var self = this;
    var projectId;
    return this
      .uploadCode(client, params)
      .then(function (res) {
        projectId = res.id;
        return self.downloadCode(client, res.id);
      })
      .then(function (res) {
        return self.unzipProject(res, config.filesDest || destCallback);
      })
      .then(function () {
        if (config.deleteProject) {
          return self.deleteCode(client, projectId);
        }
      });
  },
  /**
   * It cleans the temporary zip project.
   */
  cleanZipProject: function () {
    fs.unlinkSync('.tmp.zip');
  },
  /**
   * It zips all files inside the passed parameter into a single zip file. It
   * accepts an optional `cwd` parameter.
   */
  zipProject: function (files, cwd) {
    var hasFiles = false;
    // If it's already a zip file
    if (files.length === 1 && /^.*\.zip$/.test(files[0])) {
      hasFiles = true;
      fs.outputFileSync('.tmp.zip', fs.readFileSync(files[0]));
    } else {
      var zip = new JSZip();
      for (var i = 0, l = files.length; i < l; ++i) {
        // Bypass unwanted patterns from `files`
        if (/.*\.(git|hg)(\/.*|$)/.test(files[i].path || files[i])) {
          continue;
        }
        var buffer, name;
        var path = cwd ? cwd + '/' + files[i] : files[i];
        // If buffer
        if (files[i].contents) {
          name = path.relative(files[i].cwd, files[i].path);
          buffer = files[i].contents;
        }
        // Else if it's a path and not a directory
        else if (!fs.statSync(path).isDirectory()) {
          name = files[i];
          buffer = fs.readFileSync(path);
        }
        // Else if it's a directory path
        else {
          zip.folder(path);
        }
        if (name) {
          hasFiles = true;
          zip.file(name, buffer);
        }
      }
      if (hasFiles) {
        fs.outputFileSync('.tmp.zip', zip.generate({type: 'nodebuffer'}), {encoding: 'base64'});
        files[0] = '.tmp.zip';
        files.length = 1;
      } else {
        throw new Error('No source files found. If you intend to send a whole directory sufix your path with "**" (e.g. ./my-directory/**)');
      }
    }
  },
  /**
   * It unzips a zip file to the given destination.
   */
  unzipProject: function (zipFile, dest) {
    var zip = new JSZip(zipFile);
    var size = _.size(zip.files);
    for (var file in zip.files) {
      if (!zip.files[file].options.dir) {
        var buffer = zip.file(file).asNodeBuffer();
        if (typeof dest === 'function') {
          dest(buffer, file);
        } else if (dest) {
          var lastDestChar = dest[dest.length - 1];
          var destPath;
          if (size === 1 && lastDestChar !== '/' && lastDestChar !== '\\') {
            destPath = dest;
          } else {
            destPath = path.join(dest, file);
          }
          fs.outputFileSync(destPath, buffer);
        }
      }
    }
  }
};
