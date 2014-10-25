/*
 convert from command line option format to snake case for
 the jscrambler API. It also replaces true bool flags with %DEFAULT% values 
*/

'use strict';

var snakeCase = require('snake-case');

module.exports = function parseCLIConfig(commander, config) {
  // override config file changes with any specified command line options
  var name, is_bool_flag = {
    assertsElimination: false,
    browserOsLock: false,
    constantFolding: true,
    deadCode: true,
    deadCodeElimination: true,
    debuggingCodeElimination: false,
    dictionaryCompression: true,
    domainLock: false,
    dotNotationElimination: true,
    exceptionsList: false,
    expirationDate: false,
    functionOutlining: true,
    functionReorder: true,
    ignoreFiles: false,
    literalHooking: false,
    literalDuplicates: true,
    memberEnumeration: true,
    mode: false,
    namePrefix: false,
    renameAll: true,
    renameLocal: true,
    selfDefending: true,
    stringSplitting: false,
    whitespace: false
  };

  for (name in is_bool_flag) {
    if (commander[name] !== undefined) {
      if (is_bool_flag[name] === true) {
        config[snakeCase(name)] = '%DEFAULT%'
      } else {
        config[snakeCase(name)] = commander[name];
      }
    }
  }
}
