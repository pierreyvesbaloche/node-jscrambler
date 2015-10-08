"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApplication = getApplication;

function getApplication(applicationId) {
  return {
    query: "\n      query getApplication ($applicationId: String!) {\n        application(_id: $applicationId) {\n          _id,\n          name,\n          createdAt,\n          sources {\n            extension\n          }\n        }\n      }\n    ",
    params: JSON.stringify({
      applicationId: applicationId
    })
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBTyxTQUFTLGNBQWMsQ0FBRSxhQUFhLEVBQUU7QUFDN0MsU0FBTztBQUNMLFNBQUssa1BBV0o7QUFDRCxVQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUNyQixtQkFBYSxFQUFiLGFBQWE7S0FDZCxDQUFDO0dBQ0gsQ0FBQztDQUNIIiwiZmlsZSI6InF1ZXJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpb24gKGFwcGxpY2F0aW9uSWQpIHtcbiAgcmV0dXJuIHtcbiAgICBxdWVyeTogYFxuICAgICAgcXVlcnkgZ2V0QXBwbGljYXRpb24gKCRhcHBsaWNhdGlvbklkOiBTdHJpbmchKSB7XG4gICAgICAgIGFwcGxpY2F0aW9uKF9pZDogJGFwcGxpY2F0aW9uSWQpIHtcbiAgICAgICAgICBfaWQsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjcmVhdGVkQXQsXG4gICAgICAgICAgc291cmNlcyB7XG4gICAgICAgICAgICBleHRlbnNpb25cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgLFxuICAgIHBhcmFtczogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgYXBwbGljYXRpb25JZFxuICAgIH0pXG4gIH07XG59XG4iXX0=
