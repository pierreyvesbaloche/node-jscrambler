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

const updateApplicationSourceDefaultFragments = `
  _id,
  filename,
  extension
`;

export function updateApplicationSource (applicationSource, fragments = updateApplicationSourceDefaultFragments) {
  return {
    query: `
      mutation updateApplicationSource ($sourceId: String!, $data: ApplicationSourceInput!) {
        updateApplicationSource(_id: $sourceId, data: $data) {
          ${fragments}
        }
      }
    `,
    params: {
      sourceId: applicationSource._id,
      data: applicationSource
    }
  };
}
