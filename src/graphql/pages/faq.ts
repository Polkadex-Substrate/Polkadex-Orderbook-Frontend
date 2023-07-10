import { gql } from "graphql-request";

export const introductionSection = gql`
  query {
    faq {
      data {
        attributes {
          introduction {
            ... on ComponentPageIntroduction {
              id
              title
              description
            }
          }
        }
      }
    }
  }
`;
