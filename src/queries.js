const getApplicationDefaultFragments = `
  _id,
  name,
  createdAt,
  sources {
    _id,
    filename,
    extension
  }
`;

export function getApplication (applicationId, fragments = getApplicationDefaultFragments) {
  return {
    query: `
      query getApplication ($applicationId: String!) {
        application(_id: $applicationId) {
          ${fragments}
        }
      }
    `,
    params: JSON.stringify({
      applicationId
    })
  };
}

const getApplicationSourceDefaultFragments = `
  _id,
  filename,
  extension
`;

export function getApplicationSource (sourceId, fragments = getApplicationSourceDefaultFragments) {
  return {
    query: `
      query getApplicationSource ($sourceId: String!) {
        applicationSource(_id: $sourceId) {
          ${fragments}
        }
      }
    `,
    params: JSON.stringify({
      sourceId
    })
  };
}
