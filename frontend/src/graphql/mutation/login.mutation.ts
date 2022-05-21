import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        id
        username
        name
      }
      jwt
    }
  }
`;
