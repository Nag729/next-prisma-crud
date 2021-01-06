import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function BackToHome() {
  return (
    <NextLink href="/">
      <Link className="home-link" color="blue.500">
        {"<"} Back to home
      </Link>
    </NextLink>
  );
}
