'use strict';

var clone = require('lodash.clone');
var snakeCase = require('snake-case');

module.exports = {
  // Convert from command line option format to snake case for the JScrambler API.
  // It also replaces truthy boolean flags with %DEFAULT% values
  mergeAndParseParams: function (commander, params) {
    params = clone(params || {});

    // Override params file changes with any specified command line options
    var name, is_bool_flag = {
      assertsElimination: false,
      browserOsLock: false,
      constantFolding: true,
      deadCode: true,
      deadCodeElimination: true,
      debuggingCodeElimination: false,
      dictionaryCompression: true,
      domainLock: false,
      domainLockWarningFunction: false,
      dotNotationElimination: true,
      exceptionsList: false,
      expirationDate: false,
      expirationDateWarningFunction: false,
      functionOutlining: true,
      functionReorder: true,
      ignoreFiles: false,
      literalHooking: false,
      literalDuplicates: true,
      memberEnumeration: true,
      mode: false,
      namePrefix: false,
      renameAll: false,
      renameLocal: true,
      selfDefending: false,
      stringSplitting: false,
      whitespace: false
    };

    for (name in is_bool_flag) {
      if (commander[name] !== undefined) {
        if (is_bool_flag[name] === true) {
          params[snakeCase(name)] = '%DEFAULT%';
        } else {
          params[snakeCase(name)] = commander[name];
        }
      }
    }

    return params;
  }
};
