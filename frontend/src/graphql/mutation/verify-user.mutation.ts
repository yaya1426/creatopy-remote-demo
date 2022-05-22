import { gql } from "@apollo/client";

export const VERIFY_USER = gql`
  mutation VerifyUser($data: VerifyUserInput!) {
    verifyUser(data: $data)
  }
`;
