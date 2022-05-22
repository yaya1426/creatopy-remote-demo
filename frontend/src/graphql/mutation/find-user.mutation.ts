import { gql } from "@apollo/client";

export const FIND_USER = gql`
  mutation FindUser($username: String!) {
    findUser(username: $username) {
      id
      username
      name
    }
  }
`;
