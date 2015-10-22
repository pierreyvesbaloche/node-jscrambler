"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApplication = createApplication;
exports.updateApplication = updateApplication;
exports.updateApplicationSource = updateApplicationSource;
exports.removeSourceFromApplication = removeSourceFromApplication;
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

var updateApplicationDefaultFragments = "\n  _id,\n  createdAt,\n  name\n";

function updateApplication(application) {
  var fragments = arguments.length <= 1 || arguments[1] === undefined ? updateApplicationDefaultFragments : arguments[1];

  return {
    query: "\n      mutation updateApplication ($applicationId: String!, $data: ApplicationInput!) {\n        updateApplication (_id: $applicationId, data: $data) {\n          " + fragments + "\n        }\n      }\n    ",
    params: {
      applicationId: application._id,
      data: application
    }
  };
}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tdXRhdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBTSxpQ0FBaUMscUNBSXRDLENBQUM7O0FBRUssU0FBUyxpQkFBaUIsQ0FBRSxJQUFJLEVBQWlEO01BQS9DLFNBQVMseURBQUcsaUNBQWlDOztBQUNwRixTQUFPO0FBQ0wsU0FBSyw0SEFHRyxTQUFTLCtCQUdoQjtBQUNELFVBQU0sRUFBRTtBQUNOLFVBQUksRUFBSixJQUFJO0tBQ0w7R0FDRixDQUFDO0NBQ0g7O0FBRUQsSUFBTSxpQ0FBaUMscUNBSXRDLENBQUM7O0FBRUssU0FBUyxpQkFBaUIsQ0FBRSxXQUFXLEVBQWlEO01BQS9DLFNBQVMseURBQUcsaUNBQWlDOztBQUMzRixTQUFPO0FBQ0wsU0FBSywyS0FHRyxTQUFTLCtCQUdoQjtBQUNELFVBQU0sRUFBRTtBQUNOLG1CQUFhLEVBQUUsV0FBVyxDQUFDLEdBQUc7QUFDOUIsVUFBSSxFQUFFLFdBQVc7S0FDbEI7R0FDRixDQUFDO0NBQ0g7O0FBRUQsSUFBTSx1Q0FBdUMseUNBSTVDLENBQUM7O0FBRUssU0FBUyx1QkFBdUIsQ0FBRSxpQkFBaUIsRUFBdUQ7TUFBckQsU0FBUyx5REFBRyx1Q0FBdUM7O0FBQzdHLFNBQU87QUFDTCxTQUFLLGtMQUdHLFNBQVMsK0JBR2hCO0FBQ0QsVUFBTSxFQUFFO0FBQ04sY0FBUSxFQUFFLGlCQUFpQixDQUFDLEdBQUc7QUFDL0IsVUFBSSxFQUFFLGlCQUFpQjtLQUN4QjtHQUNGLENBQUM7Q0FDSDs7QUFFRCxJQUFNLDJDQUEyQyxPQUNoRCxDQUFDOztBQUVLLFNBQVMsMkJBQTJCLENBQUUsUUFBUSxFQUFFLGFBQWEsRUFBMkQ7TUFBekQsU0FBUyx5REFBRywyQ0FBMkM7O0FBQzNILFNBQU87QUFDTCxTQUFLLDhKQUdHLFNBQVMsK0JBR2hCO0FBQ0QsVUFBTSxFQUFFO0FBQ04sU0FBRyxFQUFFLFFBQVE7QUFDYixtQkFBYSxFQUFiLGFBQWE7S0FDZDtHQUNGLENBQUM7Q0FDSCIsImZpbGUiOiJtdXRhdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcmVhdGVBcHBsaWNhdGlvbkRlZmF1bHRGcmFnbWVudHMgPSBgXG4gIF9pZCxcbiAgY3JlYXRlZEF0LFxuICBuYW1lXG5gO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwbGljYXRpb24gKGRhdGEsIGZyYWdtZW50cyA9IGNyZWF0ZUFwcGxpY2F0aW9uRGVmYXVsdEZyYWdtZW50cykge1xuICByZXR1cm4ge1xuICAgIHF1ZXJ5OiBgXG4gICAgICBtdXRhdGlvbiBjcmVhdGVBcHBsaWNhdGlvbiAoJGRhdGE6IEFwcGxpY2F0aW9uSW5wdXQhKSB7XG4gICAgICAgIGNyZWF0ZUFwcGxpY2F0aW9uKGRhdGE6ICRkYXRhKSB7XG4gICAgICAgICAgJHtmcmFnbWVudHN9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgLFxuICAgIHBhcmFtczoge1xuICAgICAgZGF0YVxuICAgIH1cbiAgfTtcbn1cblxuY29uc3QgdXBkYXRlQXBwbGljYXRpb25EZWZhdWx0RnJhZ21lbnRzID0gYFxuICBfaWQsXG4gIGNyZWF0ZWRBdCxcbiAgbmFtZVxuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFwcGxpY2F0aW9uIChhcHBsaWNhdGlvbiwgZnJhZ21lbnRzID0gdXBkYXRlQXBwbGljYXRpb25EZWZhdWx0RnJhZ21lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgcXVlcnk6IGBcbiAgICAgIG11dGF0aW9uIHVwZGF0ZUFwcGxpY2F0aW9uICgkYXBwbGljYXRpb25JZDogU3RyaW5nISwgJGRhdGE6IEFwcGxpY2F0aW9uSW5wdXQhKSB7XG4gICAgICAgIHVwZGF0ZUFwcGxpY2F0aW9uIChfaWQ6ICRhcHBsaWNhdGlvbklkLCBkYXRhOiAkZGF0YSkge1xuICAgICAgICAgICR7ZnJhZ21lbnRzfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGFwcGxpY2F0aW9uSWQ6IGFwcGxpY2F0aW9uLl9pZCxcbiAgICAgIGRhdGE6IGFwcGxpY2F0aW9uXG4gICAgfVxuICB9O1xufVxuXG5jb25zdCB1cGRhdGVBcHBsaWNhdGlvblNvdXJjZURlZmF1bHRGcmFnbWVudHMgPSBgXG4gIF9pZCxcbiAgZmlsZW5hbWUsXG4gIGV4dGVuc2lvblxuYDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFwcGxpY2F0aW9uU291cmNlIChhcHBsaWNhdGlvblNvdXJjZSwgZnJhZ21lbnRzID0gdXBkYXRlQXBwbGljYXRpb25Tb3VyY2VEZWZhdWx0RnJhZ21lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgcXVlcnk6IGBcbiAgICAgIG11dGF0aW9uIHVwZGF0ZUFwcGxpY2F0aW9uU291cmNlICgkc291cmNlSWQ6IFN0cmluZyEsICRkYXRhOiBBcHBsaWNhdGlvblNvdXJjZUlucHV0ISkge1xuICAgICAgICB1cGRhdGVBcHBsaWNhdGlvblNvdXJjZShfaWQ6ICRzb3VyY2VJZCwgZGF0YTogJGRhdGEpIHtcbiAgICAgICAgICAke2ZyYWdtZW50c31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIGAsXG4gICAgcGFyYW1zOiB7XG4gICAgICBzb3VyY2VJZDogYXBwbGljYXRpb25Tb3VyY2UuX2lkLFxuICAgICAgZGF0YTogYXBwbGljYXRpb25Tb3VyY2VcbiAgICB9XG4gIH07XG59XG5cbmNvbnN0IHJlbW92ZVNvdXJjZUZyb21BcHBsaWNhdGlvbkRlZmF1bHRGcmFnbWVudHMgPSBgXG5gO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlU291cmNlRnJvbUFwcGxpY2F0aW9uIChzb3VyY2VJZCwgYXBwbGljYXRpb25JZCwgZnJhZ21lbnRzID0gcmVtb3ZlU291cmNlRnJvbUFwcGxpY2F0aW9uRGVmYXVsdEZyYWdtZW50cykge1xuICByZXR1cm4ge1xuICAgIHF1ZXJ5OiBgXG4gICAgICBtdXRhdGlvbiByZW1vdmVTb3VyY2UgKCRfaWQ6IFN0cmluZyEsICRhcHBsaWNhdGlvbklkOiBTdHJpbmchKSB7XG4gICAgICAgIHJlbW92ZVNvdXJjZSAoX2lkOiAkX2lkLCBhcHBsaWNhdGlvbklkOiAkYXBwbGljYXRpb25JZCkge1xuICAgICAgICAgICR7ZnJhZ21lbnRzfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIF9pZDogc291cmNlSWQsXG4gICAgICBhcHBsaWNhdGlvbklkXG4gICAgfVxuICB9O1xufVxuIl19
