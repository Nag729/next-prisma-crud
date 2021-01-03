import { AddIcon } from "@chakra-ui/icons";
import { Box, Heading, Image, Stack, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  InputControl,
  NumberInputControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
} from "formik-chakra-ui";
import Router from "next/router";
import React from "react";
import * as Yup from "yup";
import BackToHome from "../components/BackToHome";
import styles from "../styles/Home.module.css";
import axios from "./../components/util/customAxios";

export default function Create() {
  const toast = useToast();

  // values for Formik.
  const createValues = () => {
    return {
      name: "",
      description: "",
      price: "",
      isRecommend: false,
    };
  };
  const initialValues = createValues();

  // validations
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string(),
    price: Yup.number().min(0).max(3000),
    isRecomment: Yup.boolean(),
  });

  // events
  const createBeverage = async (values, actions) => {
    const body = {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      isRecommend: values.isRecommend,
    };
    await axios.post("/api/beverages", body);

    // form reset
    Object.assign(values, createValues());

    // submit finish
    actions.setSubmitting(false);

    // back to home
    Router.push({
      pathname: "/",
    });

    // success toast
    toast({
      title: "Create Successed !",
      description: "We've created new beverage you entered.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* link to home. */}
        <BackToHome></BackToHome>

        {/* Starbucks logo */}
        <Box mt="5" mb="2">
          <Image
            borderRadius="full"
            boxSize="150px"
            src="/starbucks-logo.png"
            alt="StarBucks_logo"
          />
        </Box>

        {/* title */}
        <Heading
          maxWidth="80vw"
          size="lg"
          my="5"
          textAlign="center"
          color="gray.600"
        >
          新しいメニューを登録しましょう.
        </Heading>

        {/* Form */}
        <Box width="30rem">
          <Formik
            initialValues={initialValues}
            onSubmit={createBeverage}
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
                  <SubmitButton leftIcon={<AddIcon />}>登録する</SubmitButton>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </main>
    </div>
  );
}
