import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function LinkButton(props) {
  return (
    <NextLink href={props.href}>
      <Stack>
        <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" size="lg">
          {props.children}
        </Button>
      </Stack>
    </NextLink>
  );
}
