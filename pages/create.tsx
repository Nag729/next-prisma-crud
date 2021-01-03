import { AddIcon } from "@chakra-ui/icons";
import { Box, Heading, Stack } from "@chakra-ui/react";
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
import BackToHome from "../components/BackToHome";
import styles from "../styles/Home.module.css";

export default function Create() {
  // values for Fromik.
  const initialValues = {
    name: "",
    price: "",
    isRecommend: false,
  };

  // validations
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string(),
    price: Yup.number().min(0).max(3000),
    isRecomment: Yup.boolean(),
  });

  // events
  const createDrink = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* link to home. */}
        <BackToHome></BackToHome>

        {/* title */}
        <Heading
          maxWidth="80vw"
          size="xl"
          my="5"
          textAlign="center"
          color="gray.600"
        >
          Create New Customized Drink !
        </Heading>

        {/* Form */}
        <Box width="30rem">
          <Formik
            initialValues={initialValues}
            onSubmit={createDrink}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                {/* name */}
                <InputControl name="name" label="Drink Name" isRequired />

                {/* description */}
                <TextareaControl name="description" label="Description" />

                {/* price */}
                <NumberInputControl name="price" label="Price" />

                {/* isRecommend */}
                <SwitchControl name="isRecommend" label="Recommend" />

                {/* create new drink button. */}
                <Stack>
                  <SubmitButton leftIcon={<AddIcon />}>
                    Create New Drink
                  </SubmitButton>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </main>
    </div>
  );
}
