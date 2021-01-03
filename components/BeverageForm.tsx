import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  InputControl,
  NumberInputControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
} from "formik-chakra-ui";
import React from "react";
import * as Yup from "yup";

export default function BeverageForm({
  initialValues,
  onSubmit,
  type = "create",
}) {
  // validations
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string(),
    price: Yup.number().min(0).max(3000),
    isRecomment: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Form>
          {/* name */}
          <InputControl name="name" label="Beverage Name" isRequired />

          {/* description */}
          <TextareaControl name="description" label="Description" />

          {/* price */}
          <NumberInputControl name="price" label="Price" />

          {/* isRecommend */}
          <SwitchControl name="isRecommend" label="Recommend" />

          {/* create new beverage button. */}
          <Stack>
            {type === "create" ? (
              <SubmitButton leftIcon={<AddIcon />}>登録する</SubmitButton>
            ) : (
              <SubmitButton leftIcon={<EditIcon />}>更新する</SubmitButton>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
