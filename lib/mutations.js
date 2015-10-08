"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApplication = createApplication;

function createApplication(data) {
  return {
    query: "\n      mutation createApplication ($data: ApplicationInput!) {\n        createApplication(data: $data) {\n          _id,\n          createdAt,\n          name\n        }\n      }\n    ",
    params: {
      data: data
    }
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tdXRhdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLFNBQVMsaUJBQWlCLENBQUUsSUFBSSxFQUFFO0FBQ3ZDLFNBQU87QUFDTCxTQUFLLDZMQVFKO0FBQ0QsVUFBTSxFQUFFO0FBQ04sVUFBSSxFQUFKLElBQUk7S0FDTDtHQUNGLENBQUM7Q0FDSCIsImZpbGUiOiJtdXRhdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwbGljYXRpb24gKGRhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICBxdWVyeTogYFxuICAgICAgbXV0YXRpb24gY3JlYXRlQXBwbGljYXRpb24gKCRkYXRhOiBBcHBsaWNhdGlvbklucHV0ISkge1xuICAgICAgICBjcmVhdGVBcHBsaWNhdGlvbihkYXRhOiAkZGF0YSkge1xuICAgICAgICAgIF9pZCxcbiAgICAgICAgICBjcmVhdGVkQXQsXG4gICAgICAgICAgbmFtZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGRhdGFcbiAgICB9XG4gIH07XG59XG4iXX0=
