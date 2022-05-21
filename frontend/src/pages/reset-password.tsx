import { useCheckAuth } from "hooks/use-check-auth";

export const ResetPasswordPage: React.FC = () => {
  // ON LOAD, CHECK IF ALREADY LOGGED IN, THEN REDIRECT TO HOME
  useCheckAuth();
  
  return <></>;
};
