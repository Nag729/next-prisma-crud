import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // error handling
    const toast = createStandaloneToast();
    toast({
      title: "Oops, something went wrong.",
      description: error.response.data || "Unknown Error has occured.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    return Promise.reject(error);
  }
);

export default instance;
