import { Box, Heading, Image, useToast } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";
import BackToList from "../components/BackToList";
import BeverageForm from "../components/BeverageForm";
import styles from "../styles/Home.module.css";
import { BeverageFormData } from "../types/beverage";
import axios from "../util/customAxios";

export default function Create() {
  const toast = useToast();

  // values for Formik.
  const createValues = (): BeverageFormData => {
    return {
      name: "",
      description: "",
      price: "",
      isRecommend: false,
    };
  };

  const initialValues = createValues();

  // events
  const createBeverage = async (values: BeverageFormData, actions) => {
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
          新しいメニューを登録しましょう.
        </Heading>

        {/* Form */}
        <Box
          width={[
            "80vw", // 0-30em
            "70vw", // 30em-48em
            "70vw", // 48em-62em
            "40vw", // 62em+
          ]}
        >
          <BeverageForm
            initialValues={initialValues}
            onSubmit={createBeverage}
            type="create"
          ></BeverageForm>
        </Box>
      </main>
    </div>
  );
}
