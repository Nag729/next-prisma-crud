import { EditIcon } from "@chakra-ui/icons";
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
import BackToList from "../../components/BackToList";
import {
  getAllBeverageIds,
  getBeverageData,
} from "../../components/util/beverageService";
import axios from "../../components/util/customAxios";
import styles from "../../styles/Home.module.css";
const isEqual = require("lodash.isequal");

export async function getStaticPaths() {
  const paths = await getAllBeverageIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const beverageData = await getBeverageData(params.id);
  return {
    props: {
      beverageData,
    },
  };
}

export default function Update({ beverageData }) {
  const toast = useToast();

  // values for Formik.
  const createValues = () => {
    return {
      name: beverageData.name,
      description: beverageData.description,
      price: String(beverageData.price),
      isRecommend: beverageData.isRecommend,
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
  const updateBeverage = async (values, actions) => {
    // check input change
    const isSame = isEqual(values, createValues());
    if (isSame) {
      toast({
        title: "No Change !",
        description: "Please change input value before update.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const body = {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      isRecommend: values.isRecommend,
    };
    await axios.put(`/api/beverage/${beverageData.id}`, body);

    // submit finish
    actions.setSubmitting(false);

    // back to home
    Router.push({
      pathname: "/list",
    });

    // success toast
    toast({
      title: "Update Successed !",
      description: "We've updated beverage you clicked.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* link to list. */}
        <BackToList></BackToList>

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
          メニューを編集しましょう.
        </Heading>

        {/* Form */}
        <Box width="30rem">
          <Formik
            initialValues={initialValues}
            onSubmit={updateBeverage}
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
                  <SubmitButton leftIcon={<EditIcon />}>更新する</SubmitButton>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </main>
    </div>
  );
}
