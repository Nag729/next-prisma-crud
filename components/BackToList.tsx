import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function BackToList() {
  return (
    <NextLink href="/list">
      <Link className="list-link" color="blue.500">
        {"<"} Back to list
      </Link>
    </NextLink>
  );
}
