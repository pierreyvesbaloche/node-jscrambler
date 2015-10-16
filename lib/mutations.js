"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApplication = createApplication;
<<<<<<< HEAD
exports.updateApplicationSource = updateApplicationSource;
=======
exports.removeSourceFromApplication = removeSourceFromApplication;
>>>>>>> 5b14569da2da78f3da771fbee635933646f8b76b
var createApplicationDefaultFragments = "\n  _id,\n  createdAt,\n  name\n";

function createApplication(data) {
  var fragments = arguments.length <= 1 || arguments[1] === undefined ? createApplicationDefaultFragments : arguments[1];

  return {
    query: "\n      mutation createApplication ($data: ApplicationInput!) {\n        createApplication(data: $data) {\n          " + fragments + "\n        }\n      }\n    ",
    params: {
      data: data
    }
  };
}

<<<<<<< HEAD
var updateApplicationSourceDefaultFragments = "\n  _id,\n  filename,\n  extension\n";

function updateApplicationSource(applicationSource) {
  var fragments = arguments.length <= 1 || arguments[1] === undefined ? updateApplicationSourceDefaultFragments : arguments[1];

  return {
    query: "\n      mutation updateApplicationSource ($sourceId: String!, $data: ApplicationSourceInput!) {\n        updateApplicationSource(_id: $sourceId, data: $data) {\n          " + fragments + "\n        }\n      }\n    ",
    params: {
      sourceId: applicationSource._id,
      data: applicationSource
    }
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tdXRhdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQU0saUNBQWlDLHFDQUl0QyxDQUFDOztBQUVLLFNBQVMsaUJBQWlCLENBQUUsSUFBSSxFQUFpRDtNQUEvQyxTQUFTLHlEQUFHLGlDQUFpQzs7QUFDcEYsU0FBTztBQUNMLFNBQUssNEhBR0csU0FBUywrQkFHaEI7QUFDRCxVQUFNLEVBQUU7QUFDTixVQUFJLEVBQUosSUFBSTtLQUNMO0dBQ0YsQ0FBQztDQUNIOztBQUVELElBQU0sdUNBQXVDLHlDQUk1QyxDQUFDOztBQUVLLFNBQVMsdUJBQXVCLENBQUUsaUJBQWlCLEVBQXVEO01BQXJELFNBQVMseURBQUcsdUNBQXVDOztBQUM3RyxTQUFPO0FBQ0wsU0FBSyxrTEFHRyxTQUFTLCtCQUdoQjtBQUNELFVBQU0sRUFBRTtBQUNOLGNBQVEsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHO0FBQy9CLFVBQUksRUFBRSxpQkFBaUI7S0FDeEI7R0FDRixDQUFDO0NBQ0giLCJmaWxlIjoibXV0YXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3JlYXRlQXBwbGljYXRpb25EZWZhdWx0RnJhZ21lbnRzID0gYFxuICBfaWQsXG4gIGNyZWF0ZWRBdCxcbiAgbmFtZVxuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwcGxpY2F0aW9uIChkYXRhLCBmcmFnbWVudHMgPSBjcmVhdGVBcHBsaWNhdGlvbkRlZmF1bHRGcmFnbWVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICBxdWVyeTogYFxuICAgICAgbXV0YXRpb24gY3JlYXRlQXBwbGljYXRpb24gKCRkYXRhOiBBcHBsaWNhdGlvbklucHV0ISkge1xuICAgICAgICBjcmVhdGVBcHBsaWNhdGlvbihkYXRhOiAkZGF0YSkge1xuICAgICAgICAgICR7ZnJhZ21lbnRzfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGRhdGFcbiAgICB9XG4gIH07XG59XG5cbmNvbnN0IHVwZGF0ZUFwcGxpY2F0aW9uU291cmNlRGVmYXVsdEZyYWdtZW50cyA9IGBcbiAgX2lkLFxuICBmaWxlbmFtZSxcbiAgZXh0ZW5zaW9uXG5gO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQXBwbGljYXRpb25Tb3VyY2UgKGFwcGxpY2F0aW9uU291cmNlLCBmcmFnbWVudHMgPSB1cGRhdGVBcHBsaWNhdGlvblNvdXJjZURlZmF1bHRGcmFnbWVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICBxdWVyeTogYFxuICAgICAgbXV0YXRpb24gdXBkYXRlQXBwbGljYXRpb25Tb3VyY2UgKCRzb3VyY2VJZDogU3RyaW5nISwgJGRhdGE6IEFwcGxpY2F0aW9uU291cmNlSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUFwcGxpY2F0aW9uU291cmNlKF9pZDogJHNvdXJjZUlkLCBkYXRhOiAkZGF0YSkge1xuICAgICAgICAgICR7ZnJhZ21lbnRzfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHNvdXJjZUlkOiBhcHBsaWNhdGlvblNvdXJjZS5faWQsXG4gICAgICBkYXRhOiBhcHBsaWNhdGlvblNvdXJjZVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==
=======
var removeSourceFromApplicationDefaultFragments = "\n";

function removeSourceFromApplication(sourceId, applicationId) {
  var fragments = arguments.length <= 2 || arguments[2] === undefined ? removeSourceFromApplicationDefaultFragments : arguments[2];

  return {
    query: "\n      mutation removeSource ($_id: String!, $applicationId: String!) {\n        removeSource (_id: $_id, applicationId: $applicationId) {\n          " + fragments + "\n        }\n      }\n    ",
    params: {
      _id: sourceId,
      applicationId: applicationId
    }
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tdXRhdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQU0saUNBQWlDLHFDQUl0QyxDQUFDOztBQUVLLFNBQVMsaUJBQWlCLENBQUUsSUFBSSxFQUFpRDtNQUEvQyxTQUFTLHlEQUFHLGlDQUFpQzs7QUFDcEYsU0FBTztBQUNMLFNBQUssNEhBR0csU0FBUywrQkFHaEI7QUFDRCxVQUFNLEVBQUU7QUFDTixVQUFJLEVBQUosSUFBSTtLQUNMO0dBQ0YsQ0FBQztDQUNIOztBQUVELElBQU0sMkNBQTJDLE9BQ2hELENBQUM7O0FBRUssU0FBUywyQkFBMkIsQ0FBRSxRQUFRLEVBQUUsYUFBYSxFQUEyRDtNQUF6RCxTQUFTLHlEQUFHLDJDQUEyQzs7QUFDM0gsU0FBTztBQUNMLFNBQUssOEpBR0csU0FBUywrQkFHaEI7QUFDRCxVQUFNLEVBQUU7QUFDTixTQUFHLEVBQUUsUUFBUTtBQUNiLG1CQUFhLEVBQWIsYUFBYTtLQUNkO0dBQ0YsQ0FBQztDQUNIIiwiZmlsZSI6Im11dGF0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNyZWF0ZUFwcGxpY2F0aW9uRGVmYXVsdEZyYWdtZW50cyA9IGBcbiAgX2lkLFxuICBjcmVhdGVkQXQsXG4gIG5hbWVcbmA7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBcHBsaWNhdGlvbiAoZGF0YSwgZnJhZ21lbnRzID0gY3JlYXRlQXBwbGljYXRpb25EZWZhdWx0RnJhZ21lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgcXVlcnk6IGBcbiAgICAgIG11dGF0aW9uIGNyZWF0ZUFwcGxpY2F0aW9uICgkZGF0YTogQXBwbGljYXRpb25JbnB1dCEpIHtcbiAgICAgICAgY3JlYXRlQXBwbGljYXRpb24oZGF0YTogJGRhdGEpIHtcbiAgICAgICAgICAke2ZyYWdtZW50c31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIGAsXG4gICAgcGFyYW1zOiB7XG4gICAgICBkYXRhXG4gICAgfVxuICB9O1xufVxuXG5jb25zdCByZW1vdmVTb3VyY2VGcm9tQXBwbGljYXRpb25EZWZhdWx0RnJhZ21lbnRzID0gYFxuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVNvdXJjZUZyb21BcHBsaWNhdGlvbiAoc291cmNlSWQsIGFwcGxpY2F0aW9uSWQsIGZyYWdtZW50cyA9IHJlbW92ZVNvdXJjZUZyb21BcHBsaWNhdGlvbkRlZmF1bHRGcmFnbWVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICBxdWVyeTogYFxuICAgICAgbXV0YXRpb24gcmVtb3ZlU291cmNlICgkX2lkOiBTdHJpbmchLCAkYXBwbGljYXRpb25JZDogU3RyaW5nISkge1xuICAgICAgICByZW1vdmVTb3VyY2UgKF9pZDogJF9pZCwgYXBwbGljYXRpb25JZDogJGFwcGxpY2F0aW9uSWQpIHtcbiAgICAgICAgICAke2ZyYWdtZW50c31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIGAsXG4gICAgcGFyYW1zOiB7XG4gICAgICBfaWQ6IHNvdXJjZUlkLFxuICAgICAgYXBwbGljYXRpb25JZFxuICAgIH1cbiAgfTtcbn1cbiJdfQ==
>>>>>>> 5b14569da2da78f3da771fbee635933646f8b76b
