import { defaultConfig } from "@orderbook/core/config";
import { gql, GraphQLClient } from "graphql-request";

const { contentfulSpaceId, contentfulAccessToken } = defaultConfig;
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}`;
export const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${contentfulAccessToken}`,
  },
});

export const getAnnouncements = gql`
  query getAnnouncements {
    annoucementsCollection(limit: 20) {
      items {
        cardsCollection(limit: 20) {
          items {
            title
            description {
              json
            }
            sys {
              id
              publishedAt
            }
          }
        }
      }
    }
  }
`;
