/* eslint-disable @typescript-eslint/no-var-requires */
const contentfulManagement = require("contentful-management");

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken:
      process.env.CONTENTFUL_MANAGEMENT_TOKEN ??
      "CFPAT-C1luh-VLLwKhRx_d3wL5g9ek6ETPbEI8F6BpbsGKw1Y",
  });

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID ?? "mk9opmzxbi2c")
    .then((space) =>
      space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT ?? "master")
    );
};
