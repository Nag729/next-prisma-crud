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
import { beverageFormSchema } from "../validators/BeverageFormSchema";

export default function BeverageForm({
  initialValues,
  onSubmit,
  type = "create",
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={beverageFormSchema}
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
