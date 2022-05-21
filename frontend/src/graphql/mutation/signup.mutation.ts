import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup($data: SignupInput!) {
    signup(data: $data) {
      user {
        id
        username
        name
      }
      jwt
    }
  }
`;
