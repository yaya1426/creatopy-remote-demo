import { gql } from "@apollo/client";

export const ALL_ITEMS = gql`
  query {
    items {
      id
      title
      createdAt
      userId
      user {
        id
        name
        username
      }
    }
  }
`;
