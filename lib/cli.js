'use strict';

var clone = require('lodash.clone');
var snakeCase = require('snake-case');

module.exports = {
  // Convert from command line option format to snake case for the JScrambler API.
  // It also replaces truthy boolean flags with %DEFAULT% values
  mergeAndParseParams: function mergeAndParseParams(commander, params) {
    params = clone(params || {});

    // Override params file changes with any specified command line options
    var name,
        is_bool_flag = {
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
      renameInclude: false,
      renameLocal: true,
      selfDefending: false,
      stringSplitting: false,
      whitespace: true,
      preserveAnnotations: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXRDLE1BQU0sQ0FBQyxPQUFPLEdBQUc7OztBQUdmLHFCQUFtQixFQUFFLDZCQUFVLFNBQVMsRUFBRSxNQUFNLEVBQUU7QUFDaEQsVUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7OztBQUc3QixRQUFJLElBQUk7UUFBRSxZQUFZLEdBQUc7QUFDdkIsd0JBQWtCLEVBQUUsS0FBSztBQUN6QixtQkFBYSxFQUFFLEtBQUs7QUFDcEIscUJBQWUsRUFBRSxJQUFJO0FBQ3JCLGNBQVEsRUFBRSxJQUFJO0FBQ2QseUJBQW1CLEVBQUUsSUFBSTtBQUN6Qiw4QkFBd0IsRUFBRSxLQUFLO0FBQy9CLDJCQUFxQixFQUFFLElBQUk7QUFDM0IsZ0JBQVUsRUFBRSxLQUFLO0FBQ2pCLCtCQUF5QixFQUFFLEtBQUs7QUFDaEMsNEJBQXNCLEVBQUUsSUFBSTtBQUM1QixvQkFBYyxFQUFFLEtBQUs7QUFDckIsb0JBQWMsRUFBRSxLQUFLO0FBQ3JCLG1DQUE2QixFQUFFLEtBQUs7QUFDcEMsdUJBQWlCLEVBQUUsSUFBSTtBQUN2QixxQkFBZSxFQUFFLElBQUk7QUFDckIsaUJBQVcsRUFBRSxLQUFLO0FBQ2xCLG9CQUFjLEVBQUUsS0FBSztBQUNyQix1QkFBaUIsRUFBRSxJQUFJO0FBQ3ZCLHVCQUFpQixFQUFFLElBQUk7QUFDdkIsVUFBSSxFQUFFLEtBQUs7QUFDWCxnQkFBVSxFQUFFLEtBQUs7QUFDakIsZUFBUyxFQUFFLEtBQUs7QUFDaEIsbUJBQWEsRUFBRSxLQUFLO0FBQ3BCLGlCQUFXLEVBQUUsSUFBSTtBQUNqQixtQkFBYSxFQUFFLEtBQUs7QUFDcEIscUJBQWUsRUFBRSxLQUFLO0FBQ3RCLGdCQUFVLEVBQUUsSUFBSTtBQUNoQix5QkFBbUIsRUFBRSxJQUFJO0tBQzFCLENBQUM7O0FBRUYsU0FBSyxJQUFJLElBQUksWUFBWSxFQUFFO0FBQ3pCLFVBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNqQyxZQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDL0IsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7U0FDdkMsTUFBTTtBQUNMLGdCQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDO09BQ0Y7S0FDRjs7QUFFRCxXQUFPLE1BQU0sQ0FBQztHQUNmO0NBQ0YsQ0FBQyIsImZpbGUiOiJjbGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjbG9uZSA9IHJlcXVpcmUoJ2xvZGFzaC5jbG9uZScpO1xudmFyIHNuYWtlQ2FzZSA9IHJlcXVpcmUoJ3NuYWtlLWNhc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIENvbnZlcnQgZnJvbSBjb21tYW5kIGxpbmUgb3B0aW9uIGZvcm1hdCB0byBzbmFrZSBjYXNlIGZvciB0aGUgSlNjcmFtYmxlciBBUEkuXG4gIC8vIEl0IGFsc28gcmVwbGFjZXMgdHJ1dGh5IGJvb2xlYW4gZmxhZ3Mgd2l0aCAlREVGQVVMVCUgdmFsdWVzXG4gIG1lcmdlQW5kUGFyc2VQYXJhbXM6IGZ1bmN0aW9uIChjb21tYW5kZXIsIHBhcmFtcykge1xuICAgIHBhcmFtcyA9IGNsb25lKHBhcmFtcyB8fCB7fSk7XG5cbiAgICAvLyBPdmVycmlkZSBwYXJhbXMgZmlsZSBjaGFuZ2VzIHdpdGggYW55IHNwZWNpZmllZCBjb21tYW5kIGxpbmUgb3B0aW9uc1xuICAgIHZhciBuYW1lLCBpc19ib29sX2ZsYWcgPSB7XG4gICAgICBhc3NlcnRzRWxpbWluYXRpb246IGZhbHNlLFxuICAgICAgYnJvd3Nlck9zTG9jazogZmFsc2UsXG4gICAgICBjb25zdGFudEZvbGRpbmc6IHRydWUsXG4gICAgICBkZWFkQ29kZTogdHJ1ZSxcbiAgICAgIGRlYWRDb2RlRWxpbWluYXRpb246IHRydWUsXG4gICAgICBkZWJ1Z2dpbmdDb2RlRWxpbWluYXRpb246IGZhbHNlLFxuICAgICAgZGljdGlvbmFyeUNvbXByZXNzaW9uOiB0cnVlLFxuICAgICAgZG9tYWluTG9jazogZmFsc2UsXG4gICAgICBkb21haW5Mb2NrV2FybmluZ0Z1bmN0aW9uOiBmYWxzZSxcbiAgICAgIGRvdE5vdGF0aW9uRWxpbWluYXRpb246IHRydWUsXG4gICAgICBleGNlcHRpb25zTGlzdDogZmFsc2UsXG4gICAgICBleHBpcmF0aW9uRGF0ZTogZmFsc2UsXG4gICAgICBleHBpcmF0aW9uRGF0ZVdhcm5pbmdGdW5jdGlvbjogZmFsc2UsXG4gICAgICBmdW5jdGlvbk91dGxpbmluZzogdHJ1ZSxcbiAgICAgIGZ1bmN0aW9uUmVvcmRlcjogdHJ1ZSxcbiAgICAgIGlnbm9yZUZpbGVzOiBmYWxzZSxcbiAgICAgIGxpdGVyYWxIb29raW5nOiBmYWxzZSxcbiAgICAgIGxpdGVyYWxEdXBsaWNhdGVzOiB0cnVlLFxuICAgICAgbWVtYmVyRW51bWVyYXRpb246IHRydWUsXG4gICAgICBtb2RlOiBmYWxzZSxcbiAgICAgIG5hbWVQcmVmaXg6IGZhbHNlLFxuICAgICAgcmVuYW1lQWxsOiBmYWxzZSxcbiAgICAgIHJlbmFtZUluY2x1ZGU6IGZhbHNlLFxuICAgICAgcmVuYW1lTG9jYWw6IHRydWUsXG4gICAgICBzZWxmRGVmZW5kaW5nOiBmYWxzZSxcbiAgICAgIHN0cmluZ1NwbGl0dGluZzogZmFsc2UsXG4gICAgICB3aGl0ZXNwYWNlOiB0cnVlLFxuICAgICAgcHJlc2VydmVBbm5vdGF0aW9uczogdHJ1ZVxuICAgIH07XG5cbiAgICBmb3IgKG5hbWUgaW4gaXNfYm9vbF9mbGFnKSB7XG4gICAgICBpZiAoY29tbWFuZGVyW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzX2Jvb2xfZmxhZ1tuYW1lXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHBhcmFtc1tzbmFrZUNhc2UobmFtZSldID0gJyVERUZBVUxUJSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyYW1zW3NuYWtlQ2FzZShuYW1lKV0gPSBjb21tYW5kZXJbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG59O1xuIl19
