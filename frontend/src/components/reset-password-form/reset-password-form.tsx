import { useMutation } from "@apollo/client";
import { Card } from "components/card/card";
import { ErrorMessage } from "components/error-message/error-message";
import { RESET_PASSWORD } from "graphql/mutation/reset-password.mutation";
import { Notify } from "notiflix";
import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";

type FormValues = {
  newPassword: string;
  confirmNewPassword?: string;
};

export const ResetPasswordForm: React.FC = () => {
  const username = useAppSelector((state) => state.user.resetPasswordUsername);
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({ mode: "onChange" });

  // Used for comparing passwords
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      setErrorMessage("");
      const { data, errors } = await resetPassword({
        variables: { data: { ...formData, username } },
      });
      if (data) {
        Notify.success("Password has been reset successfully. Please login.");
        navigate("/");
      }
      console.log(errors);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {};

  return (
    <Card width="650px" titleCentered title="Reset your password">
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3">
          <Form.Label>
            New Password <span className="text-danger">*</span>
          </Form.Label>
          <input
            className="form-control"
            {...register("newPassword", {
              required: true,
            })}
            type="password"
          />
          {errors.newPassword && (
            <div className="text-danger pt-1">Required Field</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Confirm Password <span className="text-danger">*</span>
          </Form.Label>
          <input
            className="form-control"
            {...register("confirmNewPassword", {
              required: true,
              validate: (value) =>
                value === newPassword.current || "The passwords do not match",
            })}
            type="password"
          />
          {errors.confirmNewPassword &&
            errors.confirmNewPassword.type === "required" && (
              <div className="text-danger pt-1">Required Field</div>
            )}
          {errors.confirmNewPassword && (
            <div className="text-danger pt-1">
              {errors.confirmNewPassword.message}
            </div>
          )}
        </Form.Group>
        <div className="d-grid">
          <button type="submit" className="my-3 btn btn-primary btn-block">
            Confirm
          </button>
        </div>
      </Form>
      <ErrorMessage errorMessage={errorMessage} />
      <div className="text-center mt-2">
        <div>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </Card>
  );
};
