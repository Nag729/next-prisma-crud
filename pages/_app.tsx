import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
