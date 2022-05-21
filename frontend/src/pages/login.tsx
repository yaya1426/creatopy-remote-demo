import { LoginForm } from "components/login-form/login-form";
import { PageWrapper } from "components/page-wrapper/page-wrapper";
import { useCheckAuth } from "hooks/use-check-auth";

export const LoginPage: React.FC = () => {
  // ON LOAD, CHECK IF ALREADY LOGGED IN, THEN REDIRECT TO HOME
  useCheckAuth();

  return (
    <PageWrapper isCentered>
      <LoginForm />
    </PageWrapper>
  );
};
