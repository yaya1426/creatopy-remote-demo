import { useMutation } from "@apollo/client";
import { Card } from "components/card/card";
import { LOGIN } from "graphql/mutation/login.mutation";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { login } from "store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "components/error-message/error-message";

type FormValues = {
  username: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loginUser] = useMutation(LOGIN);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      setErrorMessage("");
      const { data, errors } = await loginUser({
        variables: { data: { ...formData } },
      });
      if (data) {
        dispatch(login({ ...data.login }));
        navigate("/");
      }
      console.log(errors);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {};

  return (
    <Card width="650px" titleCentered title="Welcome To Creatopy Item App">
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3">
          <Form.Label>
            Username <span className="text-danger">*</span>
          </Form.Label>
          <input
            className="form-control"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username && (
            <div className="text-danger pt-1">Required Field</div>
          )}
        </Form.Group>
        <Form.Group>
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
        <div className="d-grid">
          <button type="submit" className="my-3 btn btn-primary btn-block">
            Login
          </button>
        </div>
      </Form>
      <ErrorMessage errorMessage={errorMessage} />
      <div className="text-center mt-2">
        <div>
          Don't have an account ? <Link to="/signup">Click Here To Signup</Link>
        </div>
        <div>
          Forgot your password ?{" "}
          <Link to="/reset-password">Click Here To Reset Password</Link>
        </div>
      </div>
    </Card>
  );
};
