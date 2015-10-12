"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApplication = getApplication;
var getApplicationDefaultFragments = "\n  _id,\n  name,\n  createdAt,\n  sources {\n    _id,\n    filename,\n    extension\n  }\n";

function getApplication(applicationId) {
  var fragments = arguments.length <= 1 || arguments[1] === undefined ? getApplicationDefaultFragments : arguments[1];

  return {
    query: "\n      query getApplication ($applicationId: String!) {\n        application(_id: $applicationId) {\n          " + fragments + "\n        }\n      }\n    ",
    params: JSON.stringify({
      applicationId: applicationId
    })
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU0sOEJBQThCLGdHQVNuQyxDQUFDOztBQUVLLFNBQVMsY0FBYyxDQUFFLGFBQWEsRUFBOEM7TUFBNUMsU0FBUyx5REFBRyw4QkFBOEI7O0FBQ3ZGLFNBQU87QUFDTCxTQUFLLHVIQUdHLFNBQVMsK0JBR2hCO0FBQ0QsVUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDckIsbUJBQWEsRUFBYixhQUFhO0tBQ2QsQ0FBQztHQUNILENBQUM7Q0FDSCIsImZpbGUiOiJxdWVyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0QXBwbGljYXRpb25EZWZhdWx0RnJhZ21lbnRzID0gYFxuICBfaWQsXG4gIG5hbWUsXG4gIGNyZWF0ZWRBdCxcbiAgc291cmNlcyB7XG4gICAgX2lkLFxuICAgIGZpbGVuYW1lLFxuICAgIGV4dGVuc2lvblxuICB9XG5gO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpb24gKGFwcGxpY2F0aW9uSWQsIGZyYWdtZW50cyA9IGdldEFwcGxpY2F0aW9uRGVmYXVsdEZyYWdtZW50cykge1xuICByZXR1cm4ge1xuICAgIHF1ZXJ5OiBgXG4gICAgICBxdWVyeSBnZXRBcHBsaWNhdGlvbiAoJGFwcGxpY2F0aW9uSWQ6IFN0cmluZyEpIHtcbiAgICAgICAgYXBwbGljYXRpb24oX2lkOiAkYXBwbGljYXRpb25JZCkge1xuICAgICAgICAgICR7ZnJhZ21lbnRzfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgICBwYXJhbXM6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGFwcGxpY2F0aW9uSWRcbiAgICB9KVxuICB9O1xufVxuIl19
