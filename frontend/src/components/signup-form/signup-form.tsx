import { useMutation } from "@apollo/client";
import { Card } from "components/card/card";
import { SIGNUP } from "graphql/mutation/signup.mutation";
import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { login } from "store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "components/error-message/error-message";
import { regexAlphanumeric, regexErrorMessage } from "utils/regex";
import { Notify } from "notiflix";

type FormValues = {
  username: string;
  name: string;
  password: string;
  confirmPassword?: string;
};

export const SignupForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [signupUser] = useMutation(SIGNUP);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({ mode: "onChange" });

  // Used for comparing passwords
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      setErrorMessage("");
      const { data } = await signupUser({
        variables: { data: formData },
      });
      if (data) {
        dispatch(login({ ...data.signup }));
        Notify.success("Account created successfully. Welcome!");
        navigate("/");
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    Notify.failure(
      "Make sure to enter all required fields (Allowed input is only Alphanumeric A-Z, a-z, 0-9)"
    );
  };

  return (
    <Card width="650px" titleCentered title="Create Your Account">
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3">
          <Form.Label>
            Name <span className="text-danger">*</span>
          </Form.Label>
          <input
            className="form-control"
            {...register("name", {
              required: true,
              pattern: {
                value: regexAlphanumeric,
                message: regexErrorMessage,
              },
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <div className="text-danger pt-1">Required Field</div>
          )}
          {errors.name && errors.name.type === "pattern" && (
            <div className="text-danger pt-1">{errors.name.message}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Username <span className="text-danger">*</span>
          </Form.Label>
          <input
            className="form-control"
            {...register("username", {
              required: true,
              pattern: {
                value: regexAlphanumeric,
                message: regexErrorMessage,
              },
            })}
          />
          {errors.username && errors.username.type === "required" && (
            <div className="text-danger pt-1">Required Field</div>
          )}
          {errors.username && errors.username.type === "pattern" && (
            <div className="text-danger pt-1">{errors.username.message}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Password <span className="text-danger">*</span>
          </Form.Label>
          <input
            className="form-control"
            {...register("password", {
              required: true,
            })}
            type="password"
          />
          {errors.password && (
            <div className="text-danger pt-1">Required Field</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Confirm Password <span className="text-danger">*</span>
          </Form.Label>
          <input
            className="form-control"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
            type="password"
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "required" && (
              <div className="text-danger pt-1">Required Field</div>
            )}
          {errors.confirmPassword && (
            <div className="text-danger pt-1">
              {errors.confirmPassword.message}
            </div>
          )}
        </Form.Group>
        <div className="d-grid">
          <button type="submit" className="my-3 btn btn-primary btn-block">
            Create Account
          </button>
        </div>
      </Form>
      <ErrorMessage errorMessage={errorMessage} />
      <div className="text-center mt-2">
        <div>
          Already have an account ? <Link to="/login">Click Here To Login</Link>
        </div>
      </div>
    </Card>
  );
};
