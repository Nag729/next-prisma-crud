import { Link, Text } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/Home.module.css";

export default function TheFooter() {
  return (
    <footer className={styles.footer}>
      <Text className="footer-text">
        Created by{" "}
        <Link
          className="footer-link"
          color="teal.500"
          href="https://github.com/Nag729/next-prisma-crud"
          isExternal
        >
          Nag729 &#128526;
        </Link>
      </Text>
    </footer>
  );
}
