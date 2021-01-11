import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import styles from "../styles/Home.module.css";
import LinkButton from "./../components/LinkButton";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Nextjs logo */}
        <Box mb="2">
          <Image
            borderRadius="full"
            boxSize="150px"
            src="/next-logo.jpeg"
            alt="Nextjs_logo"
          />
        </Box>

        {/* title */}
        <Heading
          maxWidth="80vw"
          size="3xl"
          my="5"
          textAlign="center"
          color="gray.700"
        >
          Welcome to CRUD Sample App Using{" "}
          <Link href="https://nextjs.org/" color="blue.500" isExternal>
            Next.js
          </Link>
          {" & "}
          <Link href="https://www.prisma.io/" color="blue.500" isExternal>
            Prisma
          </Link>
        </Heading>

        {/* description */}
        <Box my="3" maxWidth="80vw">
          <List spacing={2}>
            <ListItem>
              <ListIcon as={CheckIcon} color="teal.500" />
              <Link href="https://nextjs.org/" color="teal.500" isExternal>
                Next.js
              </Link>{" "}
              と{" "}
              <Link href="https://www.prisma.io/" color="teal.500" isExternal>
                Prisma
              </Link>{" "}
              を利用して、スターバックス の カスタマイズドリンク を CRUD
              できるサンプルアプリです.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="teal.500" />
              ソースコードは{" "}
              <Link
                href="https://github.com/Nag729/next-prisma-crud"
                color="teal.500"
                isExternal
              >
                GitHub - Nag729/next-prisma-crud
              </Link>{" "}
              に置いてあります.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="teal.500" />
              アプリケーション構成 / コードの説明などは、
              <Link
                href="https://qiita.com/Nag729/items/16995edd91e8c11323db"
                color="teal.500"
                isExternal
              >
                Qiita の記事
              </Link>{" "}
              にまとめています.
            </ListItem>
          </List>
        </Box>

        {/* link button */}
        <Box my="3">
          {/* Link */}
          <Box my="6">
            <LinkButton href="/list">Go To Beverage List</LinkButton>
          </Box>
        </Box>
      </main>
    </div>
  );
}
