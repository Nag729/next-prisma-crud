import { Box, Heading, Image, useToast } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";
import BackToList from "../../components/BackToList";
import BeverageForm from "../../components/BeverageForm";
import styles from "../../styles/Home.module.css";
import axios from "../../util/customAxios";
import {
  getAllBeverageIds,
  getBeverageData,
} from "../../util/service/beverageService";
const isEqual = require("lodash.isequal");

export async function getStaticPaths() {
  const paths = await getAllBeverageIds();
  return {
    paths,
    // FIXME: 存在しないURLに飛んだときの挙動
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const beverageData = await getBeverageData(params.id);
  return {
    props: {
      beverageData,
    },
    // FIXME: ISRをSSRに変更する
    revalidate: 1,
  };
}

export default function Update({ beverageData }) {
  const toast = useToast();

  // values for Formik.
  const createValues = () => {
    if (!beverageData) return {};
    return {
      name: beverageData.name,
      description: beverageData.description || "",
      price: beverageData.price ? String(beverageData.price) : "",
      isRecommend: beverageData.isRecommend || false,
    };
  };
  const initialValues = createValues();

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
            onSubmit={updateBeverage}
            type="update"
          ></BeverageForm>
        </Box>
      </main>
    </div>
  );
}
