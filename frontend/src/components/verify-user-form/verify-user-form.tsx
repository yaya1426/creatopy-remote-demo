import { useMutation } from "@apollo/client";
import { Card } from "components/card/card";
import { ErrorMessage } from "components/error-message/error-message";
import { FIND_USER } from "graphql/mutation/find-user.mutation";
import { VERIFY_USER } from "graphql/mutation/verify-user.mutation";
import { Loading, Notify } from "notiflix";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import {
  resetPasswordFormStep,
  resetPasswordFormUsername,
} from "store/slices/userSlice";

type FormValues = {
  username: string;
  recoveryCode: string;
};

export const VerifyUserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isValidUser, setIsValidUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [verifyUser] = useMutation(VERIFY_USER);
  const [findUser] = useMutation(FIND_USER);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<FormValues>({ mode: "onChange" });

  const watchUsername = watch("username");

  // ### LOOK FOR USER, ONCE TYPING IS STOPPED
  useEffect(() => {
    const username = getValues("username");
    if (username) {
      const delayDebounceFn = setTimeout(() => {
        Loading.standard();
        findUser({
          variables: {
            username,
          },
        })
          .then(({ data }) => {
            setErrorMessage("");
            setIsValidUser(true);
            Notify.success("Verification code sent to user");
            Loading.remove();
          })
          .catch((err) => {
            setErrorMessage(err.message);
            setIsValidUser(false);
            Notify.failure(err.message);
            Loading.remove();
          });
      }, 800);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [watchUsername, getValues, findUser]);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const { data } = await verifyUser({
        variables: {
          data: formData,
        },
      });
      // If user is verified then we are good to go
      if (data?.verifyUser) {
        // Set the username for next step of the form
        dispatch(resetPasswordFormUsername(formData.username));
        // Go to next step of the form
        dispatch(resetPasswordFormStep(2));
        Notify.success("User is verified successfully");
      } else {
        Notify.failure("Invalid verification code");
      }
    } catch (err: any) {
      Notify.failure("Invalid verfication code. Please try again");
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {};

  return (
    <Card width="650px" titleCentered title="Reset Your Password">
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
          <small>
            Please enter your username so we can start the reset password
            process.
          </small>
          {errors.username && (
            <div className="text-danger pt-1">Required Field</div>
          )}
        </Form.Group>
        {isValidUser && (
          <Form.Group>
            <Form.Label>
              Verification Code <span className="text-danger">*</span>
            </Form.Label>
            <input
              className="form-control"
              {...register("recoveryCode", {
                required: true,
              })}
            />
            <small>
              Please enter the verification code sent to you. (Hint: 1234)
            </small>
            {errors.username && (
              <div className="text-danger pt-1">Required Field</div>
            )}
          </Form.Group>
        )}
        <div className="d-grid">
          <button
            disabled={!isValidUser}
            type="submit"
            className="my-3 btn btn-primary btn-block"
          >
            Continue
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
