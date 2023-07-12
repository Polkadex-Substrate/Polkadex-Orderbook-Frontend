import { gql } from "graphql-request";

export const introductionSection = gql`
  fragment imageData on UploadFileEntityResponse {
    data {
      attributes {
        previewUrl
        name
        size
        url
      }
    }
  }
  query {
    faq {
      data {
        attributes {
          title
          slug
          seo {
            metaDescription
            metaImage {
              ...imageData
            }
            meta {
              name
              content
            }
          }
          blocks {
            ... on ComponentPageMessage {
              icon {
                ...imageData
              }
              description
            }
            ... on ComponentPageHero {
              title
              description
            }
            ... on ComponentPageSearch {
              icon {
                ...imageData
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
                  ...imageData
                }
                title
                link
              }
              socialCard {
                link
                icon {
                  ...imageData
                }
              }
              communityCard {
                title
                description
              }
            }
            ... on ComponentPageCategories {
              title
              description
              faq_categories {
                data {
                  attributes {
                    icon {
                      ...imageData
                    }
                    title
                    slug
                  }
                }
              }
            }
            ... on ComponentPageVideos {
              title
              description
              videoCard {
                title
                author
                url
                featured
                image {
                  ...imageData
                }
              }
            }
            ... on ComponentPageTredingTopics {
              title
              faq_articles(pagination: { start: 0, limit: 2 }) {
                data {
                  attributes {
                    heading
                    shortDescription
                    slug
                    faq_category {
                      data {
                        attributes {
                          slug
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
