import { PageWrapper } from "components/page-wrapper/page-wrapper";
import { SignupForm } from "components/signup-form/signup-form";
import { useCheckAuth } from "hooks/use-check-auth";

export const SignupPage: React.FC = () => {
  // ON LOAD, CHECK IF ALREADY LOGGED IN, THEN REDIRECT TO HOME
  useCheckAuth();

  return (
    <PageWrapper isCentered>
      <SignupForm />
    </PageWrapper>
  );
};
