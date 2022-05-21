import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
  mutation CreateItem($data: CreateItemInput!) {
    createItem(data: $data) {
      id
      title
      createdAt
      user {
        id
        username
        name
      }
    }
  }
`;
