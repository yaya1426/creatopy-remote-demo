import { useMutation } from "@apollo/client";
import { CREATE_ITEM } from "graphql/mutation/add-item.mutation";
import { Notify } from "notiflix";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "store/hooks";
import { addItem } from "store/slices/itemSlice";

interface FormValues {
  title: string;
}
export const ItemsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [createItem] = useMutation(CREATE_ITEM);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const { data } = await createItem({
        variables: {
          data: formData,
        },
      });
      // Dispatch to state
      dispatch(addItem(data.createItem));
      Notify.success("New item added successfully !");
    } catch (err: any) {
      Notify.failure(err.message);
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {};

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <Col>
            <div className="input-group mb-3">
              <input
                className="form-control"
                {...register("title", {
                  required: true,
                })}
                placeholder="Add mew item..."
              />
              <button className="btn btn-success" type="submit">
                Add Item
              </button>
            </div>
            {errors.title && (
              <div className="text-danger pt-1">Required Field</div>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};
