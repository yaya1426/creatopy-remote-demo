import { useCheckAuth } from "hooks/use-check-auth";

export const SignupPage: React.FC = () => {
  // ON LOAD, CHECK IF ALREADY LOGGED IN, THEN REDIRECT TO HOME
  useCheckAuth();

  return <></>;
};
