const createApplicationDefaultFragments = `
  _id,
  createdAt,
  name
`;

export function createApplication (data, fragments = createApplicationDefaultFragments) {
  return {
    query: `
      mutation createApplication ($data: ApplicationInput!) {
        createApplication(data: $data) {
          ${fragments}
        }
      }
    `,
    params: {
      data
    }
  };
}

const removeSourceFromApplicationDefaultFragments = `
`;

export function removeSourceFromApplication (sourceId, applicationId, fragments = removeSourceFromApplicationDefaultFragments) {
  return {
    query: `
      mutation removeSource ($_id: String!, $applicationId: String!) {
        removeSource (_id: $_id, applicationId: $applicationId) {
          ${fragments}
        }
      }
    `,
    params: {
      _id: sourceId,
      applicationId
    }
  };
}
