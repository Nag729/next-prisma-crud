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
            alt="Nextjs logo"
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
              を利用して、スターバックスの カスタマイズドリンク を CRUD
              できるサンプルアプリです。
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="teal.500" />
              アプリを実践的なものにするために{" "}
              <Link href="https://chakra-ui.com/" color="teal.500" isExternal>
                chakra UI
              </Link>
              {" / "}
              <Link href="https://jestjs.io/ja/" color="teal.500" isExternal>
                Jest
              </Link>{" "}
              などを利用しています。
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="teal.500" />
              キャッチアップのための情報は、
              <Link href="https://qiita.com/Nag729" color="teal.500" isExternal>
                Qiita - xxx
              </Link>{" "}
              にまとめています。
            </ListItem>
          </List>
        </Box>

        {/* link button */}
        <Box my="3">
          {/* Create */}
          <Box my="6">
            <LinkButton href="/create">Create New Drink</LinkButton>
          </Box>

          {/* Link */}
          <Box my="6">
            <LinkButton href="/list">Go To Drink List</LinkButton>
          </Box>
        </Box>
      </main>
    </div>
  );
}
