import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as React from "react";
import TheFooter from "../components/TheFooter";
import "../styles/globals.css";

// events for NProgress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      {/* Head */}
      <Head>
        <title>next-prisma-crud</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* main component */}
      <Component {...pageProps} />

      {/* TheFooter */}
      <TheFooter></TheFooter>
    </ChakraProvider>
  );
}

export default App;
