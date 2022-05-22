import { PageWrapper } from "components/page-wrapper/page-wrapper";
import { ResetPasswordForm } from "components/reset-password-form/reset-password-form";
import { VerifyUserForm } from "components/verify-user-form/verify-user-form";
import { useCheckAuth } from "hooks/use-check-auth";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  resetPasswordFormStep,
  resetPasswordFormUsername,
} from "store/slices/userSlice";

export const ResetPasswordPage: React.FC = () => {
  // ON LOAD, CHECK IF ALREADY LOGGED IN, THEN REDIRECT TO HOME
  useCheckAuth();
  const step = useAppSelector((state) => state.user.resetPasswordFormStep);
  const dispatch = useAppDispatch();
  // Initially reset data in case navigated away while resetting password
  useEffect(() => {
    // Set the username for next step of the form
    dispatch(resetPasswordFormUsername(null));
    // Go to next step of the form
    dispatch(resetPasswordFormStep(1));
  }, [dispatch]);
  return (
    <PageWrapper isCentered>
      {step === 1 && <VerifyUserForm />}
      {step === 2 && <ResetPasswordForm />}
    </PageWrapper>
  );
};
