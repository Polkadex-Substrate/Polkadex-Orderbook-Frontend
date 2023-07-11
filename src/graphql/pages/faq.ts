import { gql } from "graphql-request";

export const introductionSection = gql`
  query {
    faq {
      data {
        attributes {
          title
          slug
          seo {
            metaDescription
            metaImage {
              data {
                attributes {
                  previewUrl
                  name
                  size
                  url
                }
              }
            }
            meta {
              name
              content
            }
          }
          blocks {
            ... on ComponentPageMessage {
              icon {
                data {
                  attributes {
                    previewUrl
                    name
                    size
                    url
                  }
                }
              }
              description
            }
            ... on ComponentPageHero {
              title
              description
            }
            ... on ComponentPageSearch {
              icon {
                data {
                  attributes {
                    previewUrl
                    name
                    size
                    url
                  }
                }
              }
              placeholder
              message
              buttonTitle
              errorMessage
            }
            ... on ComponentPageQuickAccess {
              title
              callToAction {
                title
                link
              }
              genericLink {
                icon {
                  data {
                    attributes {
                      previewUrl
                      name
                      size
                      url
                    }
                  }
                }
                title
                link
              }
              socialCard {
                link
                icon {
                  data {
                    attributes {
                      previewUrl
                      name
                      size
                      url
                    }
                  }
                }
              }
              communityCard {
                title
                description
              }
            }
          }
        }
      }
    }
  }
`;
