"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApplication = getApplication;
exports.getApplicationSource = getApplicationSource;
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

var getApplicationSourceDefaultFragments = "\n  _id,\n  filename,\n  extension\n";

function getApplicationSource(sourceId) {
  var fragments = arguments.length <= 1 || arguments[1] === undefined ? getApplicationSourceDefaultFragments : arguments[1];

  return {
    query: "\n      query getApplicationSource ($sourceId: String!) {\n        applicationSource(_id: $sourceId) {\n          " + fragments + "\n        }\n      }\n    ",
    params: JSON.stringify({
      sourceId: sourceId
    })
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFNLDhCQUE4QixnR0FTbkMsQ0FBQzs7QUFFSyxTQUFTLGNBQWMsQ0FBRSxhQUFhLEVBQThDO01BQTVDLFNBQVMseURBQUcsOEJBQThCOztBQUN2RixTQUFPO0FBQ0wsU0FBSyx1SEFHRyxTQUFTLCtCQUdoQjtBQUNELFVBQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ3JCLG1CQUFhLEVBQWIsYUFBYTtLQUNkLENBQUM7R0FDSCxDQUFDO0NBQ0g7O0FBRUQsSUFBTSxvQ0FBb0MseUNBSXpDLENBQUM7O0FBRUssU0FBUyxvQkFBb0IsQ0FBRSxRQUFRLEVBQW9EO01BQWxELFNBQVMseURBQUcsb0NBQW9DOztBQUM5RixTQUFPO0FBQ0wsU0FBSyx5SEFHRyxTQUFTLCtCQUdoQjtBQUNELFVBQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ3JCLGNBQVEsRUFBUixRQUFRO0tBQ1QsQ0FBQztHQUNILENBQUM7Q0FDSCIsImZpbGUiOiJxdWVyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0QXBwbGljYXRpb25EZWZhdWx0RnJhZ21lbnRzID0gYFxuICBfaWQsXG4gIG5hbWUsXG4gIGNyZWF0ZWRBdCxcbiAgc291cmNlcyB7XG4gICAgX2lkLFxuICAgIGZpbGVuYW1lLFxuICAgIGV4dGVuc2lvblxuICB9XG5gO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpb24gKGFwcGxpY2F0aW9uSWQsIGZyYWdtZW50cyA9IGdldEFwcGxpY2F0aW9uRGVmYXVsdEZyYWdtZW50cykge1xuICByZXR1cm4ge1xuICAgIHF1ZXJ5OiBgXG4gICAgICBxdWVyeSBnZXRBcHBsaWNhdGlvbiAoJGFwcGxpY2F0aW9uSWQ6IFN0cmluZyEpIHtcbiAgICAgICAgYXBwbGljYXRpb24oX2lkOiAkYXBwbGljYXRpb25JZCkge1xuICAgICAgICAgICR7ZnJhZ21lbnRzfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgICBwYXJhbXM6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGFwcGxpY2F0aW9uSWRcbiAgICB9KVxuICB9O1xufVxuXG5jb25zdCBnZXRBcHBsaWNhdGlvblNvdXJjZURlZmF1bHRGcmFnbWVudHMgPSBgXG4gIF9pZCxcbiAgZmlsZW5hbWUsXG4gIGV4dGVuc2lvblxuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFwcGxpY2F0aW9uU291cmNlIChzb3VyY2VJZCwgZnJhZ21lbnRzID0gZ2V0QXBwbGljYXRpb25Tb3VyY2VEZWZhdWx0RnJhZ21lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgcXVlcnk6IGBcbiAgICAgIHF1ZXJ5IGdldEFwcGxpY2F0aW9uU291cmNlICgkc291cmNlSWQ6IFN0cmluZyEpIHtcbiAgICAgICAgYXBwbGljYXRpb25Tb3VyY2UoX2lkOiAkc291cmNlSWQpIHtcbiAgICAgICAgICAke2ZyYWdtZW50c31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIGAsXG4gICAgcGFyYW1zOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBzb3VyY2VJZFxuICAgIH0pXG4gIH07XG59XG4iXX0=
