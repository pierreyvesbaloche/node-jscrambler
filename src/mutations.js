export function createApplication (data) {
  return {
    query: `
      mutation createApplication ($data: ApplicationInput!) {
        createApplication(data: $data) {
          _id,
          createdAt,
          name
        }
      }
    `,
    params: {
      data
    }
  };
}
